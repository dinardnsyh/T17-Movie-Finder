import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY || 'f83a9c6a';
const BASE_URL = 'https://www.omdbapi.com/';

const MovieDetail = () => {
  const { imdbID } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`
        );

        const data = await response.json();

        if (data.Response === 'True') {
          setMovie(data);
        }
      } catch (error) {
        console.error('Error:', error);
      }

      setIsLoading(false);
    };

    fetchMovieDetail();
  }, [imdbID]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#022c22] text-white flex items-center justify-center">
        <p className="text-xl text-emerald-300">
          Memuat detail film...
        </p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-[#022c22] text-white flex flex-col items-center justify-center gap-4">
        <p className="text-xl">Film tidak ditemukan.</p>

        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-emerald-950 font-bold rounded-xl"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#022c22] text-white">
      
      {/* Header */}
      <div className="px-6 md:px-12 py-6 border-b border-emerald-800">
        <button
          onClick={() => navigate(-1)}
          className="text-emerald-300 hover:text-yellow-400 transition"
        >
          ← Kembali
        </button>
      </div>

      {/* Detail */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">

        <div className="grid md:grid-cols-[300px_1fr] gap-10">

          {/* Poster */}
          <div>
            <img
              src={
                movie.Poster && movie.Poster !== 'N/A'
                  ? movie.Poster
                  : 'https://via.placeholder.com/300x450?text=No+Poster'
              }
              alt={movie.Title}
              className="w-full rounded-2xl shadow-2xl"
            />
          </div>

          {/* Informasi */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4">
              {movie.Title}
            </h1>

            <p className="text-emerald-300 mb-6">
              {movie.Year} • {movie.Runtime} • {movie.Rated}
            </p>

            <p className="text-gray-200 leading-relaxed mb-8">
              {movie.Plot}
            </p>

            <div className="space-y-4 text-gray-200">

              <p>
                <span className="text-emerald-400 font-bold">
                  Genre:
                </span>{' '}
                {movie.Genre}
              </p>

              <p>
                <span className="text-emerald-400 font-bold">
                  Director:
                </span>{' '}
                {movie.Director}
              </p>

              <p>
                <span className="text-emerald-400 font-bold">
                  Actors:
                </span>{' '}
                {movie.Actors}
              </p>

              <p>
                <span className="text-emerald-400 font-bold">
                  Writer:
                </span>{' '}
                {movie.Writer}
              </p>

              <p>
                <span className="text-emerald-400 font-bold">
                  Country:
                </span>{' '}
                {movie.Country}
              </p>

              <p>
                <span className="text-emerald-400 font-bold">
                  IMDb Rating:
                </span>{' '}
                ⭐ {movie.imdbRating}
              </p>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default MovieDetail;