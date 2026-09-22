import React from 'react';
import MovieCard from '../components/MovieCard';

const Home = ({ title, movies, isLoading, errorMessage }) => {
  if (isLoading) {
    return (
      <div className="text-center mt-20 text-xl text-emerald-200">
        Loading film...
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="text-center mt-20 text-red-400 text-xl">
        {errorMessage}
      </div>
    );
  }

  if (!movies || movies.length === 0) return null;

  return (
    <div className="px-6 md:px-12 mt-12 pb-8">

      {/* Judul Kategori */}
      <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-6 border-l-4 border-yellow-500 pl-4 drop-shadow-md">
        {title}
      </h2>

      {/* Grid Film */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
          gap: '28px 20px',
        }}
      >
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
          />
        ))}
      </div>

    </div>
  );
};

export default Home;