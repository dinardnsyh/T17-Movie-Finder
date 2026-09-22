import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';

import './App.css';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY || 'f83a9c6a';

const BASE_URL = 'https://www.omdbapi.com/';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Kategori film
  const [dramaMovies, setDramaMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [bestMovies, setBestMovies] = useState([]);
  const [adventureMovies, setAdventureMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [animeMovies, setAnimeMovies] = useState([]);

  const [isLoadingHome, setIsLoadingHome] = useState(true);

  // =====================================================
  // FETCH FILM DARI OMDb
  // =====================================================

  const fetchMoviesByQuery = async (query) => {
    try {
      const response = await fetch(
        `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
      );

      const data = await response.json();

      if (data.Response === 'True' && data.Search) {
        // Hanya mengambil film yang memiliki poster
        return data.Search.filter(
          (movie) =>
            movie.Poster &&
            movie.Poster !== 'N/A'
        );
      }

      return [];
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    }
  };

  // =====================================================
  // GABUNGKAN FILM DAN HAPUS DUPLIKAT
  // =====================================================

  const combineMovies = (...movieLists) => {
    const combined = movieLists.flat();

    const uniqueMovies = Array.from(
      new Map(
        combined.map((movie) => [movie.imdbID, movie])
      ).values()
    );

    return uniqueMovies.slice(0, 10);
  };

  // =====================================================
  // LOAD SEMUA KATEGORI
  // =====================================================

  useEffect(() => {
    const fetchAllCategories = async () => {
      setIsLoadingHome(true);

      try {
        const [
          drama1,
          drama2,
          popular1,
          popular2,
          best1,
          best2,
          adventure1,
          adventure2,
          action1,
          action2,
          anime1,
          anime2,
        ] = await Promise.all([

          // 🎭 DRAMA
          fetchMoviesByQuery('drama'),
          fetchMoviesByQuery('family drama'),

          // ⭐ POPULER
          fetchMoviesByQuery('star'),
          fetchMoviesByQuery('movie'),

          // 🎬 FILM TERBAIK
          fetchMoviesByQuery('best'),
          fetchMoviesByQuery('classic'),

          // 🌟 ADVENTURE
          fetchMoviesByQuery('adventure'),
          fetchMoviesByQuery('journey'),

          // 💥 ACTION
          fetchMoviesByQuery('action'),
          fetchMoviesByQuery('hero'),

          // 🎌 ANIME & KARTUN
          fetchMoviesByQuery('doraemon'),
          fetchMoviesByQuery('anime'),
        ]);

        // Menyimpan film Drama
        setDramaMovies(
          combineMovies(drama1, drama2)
        );

        // Menyimpan film Populer
        setPopularMovies(
          combineMovies(popular1, popular2)
        );

        // Menyimpan film Terbaik
        setBestMovies(
          combineMovies(best1, best2)
        );

        // Menyimpan film Adventure
        setAdventureMovies(
          combineMovies(adventure1, adventure2)
        );

        // Menyimpan film Action
        setActionMovies(
          combineMovies(action1, action2)
        );

        // Menyimpan Anime & Kartun
        setAnimeMovies(
          combineMovies(anime1, anime2)
        );

      } catch (error) {
        console.error(
          'Error loading categories:',
          error
        );
      }

      setIsLoadingHome(false);
    };

    fetchAllCategories();
  }, []);

  // =====================================================
  // SEARCH FILM
  // =====================================================

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);

    const results =
      await fetchMoviesByQuery(searchQuery);

    setSearchResults(results);

    setIsSearching(false);
  };

  // =====================================================
  // TAMPILAN WEBSITE
  // =====================================================

  return (
  <BrowserRouter>
    <Routes>

      <Route
        path="/"
        element={
          <div className="min-h-screen bg-[#022c22] text-white font-sans">
            <Navbar />

            <div className="flex justify-center mt-6 px-6 mb-8">
              <SearchBar
                query={searchQuery}
                onQueryChange={setSearchQuery}
                onSearch={handleSearch}
              />
            </div>

            {searchQuery && searchResults.length > 0 ? (
              <Home
                title={`Hasil Pencarian: "${searchQuery}"`}
                movies={searchResults}
                isLoading={isSearching}
              />
            ) : (
              <div className="pb-16">
                {isLoadingHome ? (
                  <div className="text-center mt-20 text-xl text-emerald-200">
                    Loading Kategori...
                  </div>
                ) : (
                  <>
                    <Home
                      title="🎭 Film Drama"
                      movies={dramaMovies}
                      isLoading={false}
                    />

                    <Home
                      title="⭐ Film Populer"
                      movies={popularMovies}
                      isLoading={false}
                    />

                    <Home
                      title="🎬 Film Terbaik"
                      movies={bestMovies}
                      isLoading={false}
                    />

                    <Home
                      title="🌟 Film Adventure"
                      movies={adventureMovies}
                      isLoading={false}
                    />

                    <Home
                      title="💥 Film Action"
                      movies={actionMovies}
                      isLoading={false}
                    />

                    <Home
                      title="🎌 Anime & Kartun"
                      movies={animeMovies}
                      isLoading={false}
                    />
                  </>
                )}
              </div>
            )}
          </div>
        }
      />

      <Route
        path="/movie/:imdbID"
        element={<MovieDetail />}
      />

    </Routes>
  </BrowserRouter>
);
}

export default App;