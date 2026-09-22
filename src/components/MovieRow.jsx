// MovieRow.jsx
import React from 'react';
import MovieCard from './MovieCard';

const MovieRow = ({ title, movies }) => {
  return (
    <div className="mb-8 px-6 md:px-12">
      <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-red-600 pl-3">
        {title}
      </h2>
      
      {/* Container Scroll Horizontal */}
      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
        {movies.map((movie) => (
          <div key={movie.id} className="min-w-[160px] md:min-w-[200px] snap-start">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRow;