import React from "react";
import type { Genre } from "../types";

interface Props {
  genres: Genre[];
  selected: number | null;
  onSelect: (id: number) => void;
}

const GenreChips: React.FC<Props> = ({ genres, selected, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((g) => (
        <button
          key={g.id}
          onClick={() => onSelect(g.id)}
          className={`px-3 py-1 rounded-full border ${
            selected === g.id
              ? "bg-primary text-white border-primary"
              : "bg-white text-gray-700 border-gray-200"
          }`}
        >
          {g.name}
        </button>
      ))}
    </div>
  );
};

export default GenreChips;
