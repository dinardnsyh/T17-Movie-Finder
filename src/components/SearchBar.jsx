import React from 'react';

function SearchBar({ query, onQueryChange, onSearch }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSearch();
  }

  return (
    <form className="flex w-full max-w-2xl gap-3" onSubmit={handleSubmit}>
      <input
        type="text"
        // Background hijau muda transparan, border hijau muda
        className="flex-1 px-5 py-3 rounded-xl bg-emerald-900/40 border border-emerald-500/50 text-emerald-50 placeholder-emerald-300/50 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all"
        placeholder="Kamu ingin mencari film apa?"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
      <button 
        type="submit" 
        // Tombol Kuning Emas
        className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-emerald-950 font-bold rounded-xl shadow-lg shadow-yellow-500/20 transition-all transform hover:scale-105"
      >
        Cari
      </button>
    </form>
  );
}

export default SearchBar;