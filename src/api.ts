const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchMovies(page = 1, query = "") {
  const url = query
    ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
    : `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.results) {
    return data.results;
  } else {
    console.error("TMDB API error:", data);
    return [];
  }
}
