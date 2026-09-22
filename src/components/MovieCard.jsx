import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const hasPoster = movie.Poster && movie.Poster !== 'N/A';
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleDetail = () => {
    navigate(`/movie/${movie.imdbID}`);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`transition-all duration-300 ${
        isHovered ? 'transform -translate-y-2' : ''
      }`}
    >

      {/* Container Poster */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '2 / 3',
          borderRadius: '16px',
          overflow: 'hidden',
          backgroundColor: '#064e3b',

          border: isHovered
            ? '2px solid #facc15'
            : '2px solid #047857',

          boxShadow: isHovered
            ? '0 10px 25px -5px rgba(250, 204, 21, 0.2)'
            : 'none',

          transition: 'all 0.3s ease',
        }}
      >

        {/* Poster */}
        {hasPoster && !imgError ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
            onError={() => setImgError(true)}
          />
        ) : (
          /* Placeholder */
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background:
                'linear-gradient(145deg, #064e3b, #022c22)',
              color: '#6ee7b7',
              textAlign: 'center',
              padding: '20px',
            }}
          >
            <div
              style={{
                fontSize: '42px',
                marginBottom: '12px',
              }}
            >
              🎬
            </div>

            <div
              style={{
                fontSize: '13px',
                fontWeight: 'bold',
                color: '#facc15',
                lineHeight: '1.4',
              }}
            >
              PILMPIRGI
            </div>

            <div
              style={{
                fontSize: '11px',
                color: '#6ee7b7',
                marginTop: '5px',
              }}
            >
              MOVIE
            </div>
          </div>
        )}

        {/* Overlay ketika hover */}
        <div
          style={{
            position: 'absolute',
            inset: 0,

            backgroundColor: 'rgba(2, 44, 34, 0.85)',

            /* INI YANG MEMBUAT TOMBOL DI TENGAH */
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        >

          {/* Tombol Detail */}
          <button
            type="button"
            onClick={handleDetail}
            className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-emerald-950 font-bold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
          >
            Lihat Detail
          </button>

        </div>
      </div>

      {/* Informasi Film */}
      <div
        style={{
          marginTop: '14px',
          paddingLeft: '4px',
        }}
      >
        <h3
          style={{
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: '15px',
            margin: 0,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          title={movie.Title}
        >
          {movie.Title}
        </h3>

        <p
          style={{
            color: '#6ee7b7',
            fontSize: '13px',
            marginTop: '4px',
            marginBottom: 0,
            fontWeight: '500',
          }}
        >
          {movie.Year}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;