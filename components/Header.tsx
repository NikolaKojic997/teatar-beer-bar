
import React from 'react';

interface HeaderProps {
  showBack: boolean;
  onBack: () => void;
}

const Header: React.FC<HeaderProps> = ({ showBack, onBack }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-xl px-6 py-6 border-b border-white/5 flex items-center min-h-[120px] shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between w-full max-w-md mx-auto relative">
        <div className="flex items-center gap-4">
          {showBack && (
            <button
              onClick={onBack}
              className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white/5 hover:bg-white/10 active:scale-90 transition-all border border-white/10 flex-shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#FFD700]"><path d="m15 18-6-6 6-6" /></svg>
            </button>
          )}

          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 rounded-full border-2 border-[#FFD700] bg-white shadow-[0_0_25px_rgba(255,215,0,0.3)] flex items-center justify-center p-0 flex-shrink-0 overflow-hidden">
              <img
                src="/logo.png"
                alt="Teatar Beer Bar Logo"
                className="w-full h-full object-contain scale-[1.5] translate-y-1.5"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="font-theatre text-2xl font-black tracking-tight gold-text leading-tight uppercase">Teatar</h1>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#FF8C00] font-black opacity-90">Beer Bar 13</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://share.google/YLdmYpk5hld5sFUqc"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-amber-500/10 hover:border-amber-500/50 transition-all active:scale-90 group"
            title="Oceni nas"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400 group-hover:fill-amber-400 transition-all"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
          </a>
          <a
            href="https://www.instagram.com/teatar_beer_bar/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-pink-500/10 hover:border-pink-500/50 transition-all active:scale-90 group"
            title="Instagram"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500 group-hover:scale-110 transition-all"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y2="6.5" y1="6.5" /></svg>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
