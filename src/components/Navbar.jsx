import React from 'react';

const Navbar = () => {
  return (
    // Background Hijau Sangat Tua, Border Bawah Kuning Tipis
    <nav className="flex items-center justify-between px-8 py-5 bg-[#011f18] border-b border-yellow-500/30 shadow-lg">
      <div className="flex items-center gap-3">
        {/* Logo Kuning */}
        <span className="text-3xl text-yellow-400">🎬</span>
        <h1 className="text-2xl font-bold text-yellow-400 tracking-wide">
          PilmPirgi
        </h1>
      </div>
      <p className="text-emerald-200 text-sm font-medium">
        PilmPirgi Bekerja Sama Dengan PilmAdin
      </p>
    </nav>
  );
};

export default Navbar;