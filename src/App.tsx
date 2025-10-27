import { useEffect, useState } from "react";
import { fetchMovies } from "./api";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
  vote_average: number;
}

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchMovies(page, query).then(setMovies);
  }, [page, query]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Navbar */}
      <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow">
        <h1 className="text-2xl font-bold text-primary">🎬 MovieHub</h1>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border px-3 py-2 rounded-md text-gray-900"
          />
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 transition"
            title="Toggle theme"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </header>
      {/* Movies Grid */}
      <main className="p-6">
        {movies.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No results
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition"
                onClick={() => setSelectedMovie(movie)}
              >
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-72 object-cover"
                  />
                ) : (
                  <div className="h-72 bg-gray-300 dark:bg-gray-600" />
                )}
                <div className="p-3">
                  <h2 className="font-semibold">{movie.title}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {movie.release_date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Movie Detail Modal */}
      {selectedMovie && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setSelectedMovie(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-lg w-full mx-4 p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute top-3 right-3 text-2xl"
            >
              ✖️
            </button>

            <div className="flex flex-col md:flex-row gap-4">
              {selectedMovie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                  alt={selectedMovie.title}
                  className="w-full md:w-1/3 rounded-lg"
                />
              )}
              <div>
                <h2 className="text-xl font-bold mb-2">
                  {selectedMovie.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Released: {selectedMovie.release_date}
                </p>
                <p className="text-yellow-500 mb-2">
                  ⭐ {selectedMovie.vote_average.toFixed(1)}
                </p>
                <p className="text-gray-700 dark:text-gray-200">
                  {selectedMovie.overview}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
