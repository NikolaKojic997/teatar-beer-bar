
import React from 'react';
import { MenuItem } from '../types';

interface MenuItemListProps {
  items: MenuItem[];
}

// Komponenta za dinamičke SVG ikonice po kategorijama
const CategoryIcon: React.FC<{ group: string }> = ({ group }) => {
  const g = group.toLowerCase();

  const colors = {
    pivo: "#FFB000",
    kafa: "#d4a373",
    zestina: "#f8f9fa",
    vina: "#9d0208",
    sokovi: "#ff9f1c",
    hrana: "#aacc00",
    sejkovi: "#ffafcc",
    default: "#6366f1"
  };

  const getStyle = (key: keyof typeof colors) => ({
    color: colors[key] || colors.default,
    filter: `drop-shadow(0 0 12px ${colors[key] || colors.default}66)`
  });

  if (g.includes('piva') || g.includes('pivo')) return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={getStyle('pivo')}>
      <path d="M17 11h1c1.66 0 3 1.34 3 3s-1.34 3-3 3h-1" /><path d="M5 6h12v12H5z" /><path d="M5 13h12" /><path d="M7 6v12" /><path d="M10 6v12" /><path d="M13 6v12" /><path d="M15 6v12" /><path d="M12 21H5" />
    </svg>
  );
  if (g.includes('kafe') || g.includes('čaj') || g.includes('kafa')) return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={getStyle('kafa')}>
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" /><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" /><path d="M6 2v2" /><path d="M10 2v2" /><path d="M14 2v2" />
    </svg>
  );
  if (g.includes('zestine') || g.includes('zestina') || g.includes('gin') || g.includes('vodka') || g.includes('whiskey') || g.includes('viski')) return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={getStyle('zestina')}>
      <path d="M6 3h12l1 15a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3L6 3z" />
      <path d="M6 13h12" />
      <path d="M12 13v8" />
      <path d="M9 13v8" />
      <path d="M15 13v8" />
    </svg>
  );
  if (g.includes('vina') || g.includes('vino')) return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={getStyle('vina')}>
      <path d="M8 22h8" /><path d="M12 11v11" /><path d="M12 2s-5 0-5 5c0 4 5 4 5 4s5 0 5-4c0-5-5-5-5-5Z" /><path d="M7 6c2 1 8 1 10 0" />
    </svg>
  );
  if (g.includes('sok') || g.includes('sokovi') || g.includes('gaziran')) return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={getStyle('sokovi')}>
      <path d="M5 11h14v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V11Z" /><path d="M18 2h-1c-1 0-3 3-4 4" /><path d="m11 6 3-4" /><path d="M5 11V7a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4" />
    </svg>
  );
  if (g.includes('hrana') || g.includes('obrok') || g.includes('sendvic')) return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={getStyle('hrana')}>
      <rect x="3" y="11" width="18" height="10" rx="2" /><path d="M3 11l9-6 9 6" /><path d="M12 22v-6" />
    </svg>
  );

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={getStyle('default')}>
      <path d="M12 2 4.5 9h15Z" /><path d="M12 13v9" /><path d="M9 22h6" /><path d="M12 9v4" />
    </svg>
  );
};

const MenuItemList: React.FC<MenuItemListProps> = ({ items }) => {
  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <div className="text-center py-20 glass-card rounded-3xl">
          <p className="text-slate-400 italic text-sm">Trenutno nema artikala.</p>
        </div>
      ) : (
        items.map((item, idx) => (
          <div
            key={`${item.Naziv}-${idx}`}
            className="animate-fade-in flex items-center gap-4 p-4 glass-card rounded-3xl group hover:amber-glow transition-all duration-300"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10 bg-white/5 shadow-inner group-hover:scale-110 transition-transform flex items-center justify-center">
              <CategoryIcon group={item.Grupa} />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-slate-100 font-bold text-sm leading-tight uppercase tracking-wide group-hover:text-amber-400 transition-colors">{item.Naziv}</h4>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded-full">{item.JM}</span>
                <span className="text-[10px] text-indigo-400/60 font-semibold uppercase tracking-wider">{item.Tip}</span>
              </div>
            </div>

            <div className="text-right">
              <div className="flex flex-col items-end">
                <span className="text-xl font-bold font-theatre text-[#FFD700] tracking-tighter drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]">
                  {item.Cena.toLocaleString('sr-RS', { minimumFractionDigits: 0 })}
                </span>
                <span className="text-[9px] text-[#FF8C00] font-bold uppercase tracking-widest mt-0.5 opacity-80">RSD</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MenuItemList;
