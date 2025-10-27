import React from "react";
import type { Movie } from "../types";

interface Props {
  movie: Movie;
}

const MovieCard: React.FC<Props> = ({ movie }) => {
  const posterBase = "https://image.tmdb.org/t/p/w500";
  const poster = movie.poster_path
    ? posterBase + movie.poster_path
    : "/placeholder.jpg";
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "";

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <img
        src={poster}
        alt={movie.title}
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-medium movie-title">{movie.title}</h3>
        <p className="text-sm text-gray-500 mt-2">{year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
