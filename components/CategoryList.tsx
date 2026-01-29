
import React from 'react';
import { Category } from '../types';

interface CategoryListProps {
  categories: Category[];
  onSelect: (name: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, onSelect }) => {
  return (
    <div className="grid grid-cols-2 gap-5">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.name)}
          className="category-card relative aspect-square overflow-hidden rounded-3xl border border-white/5 shadow-2xl group"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 group-hover:from-indigo-900/40 transition-colors duration-500"></div>

          <img
            src={cat.imageUrl}
            alt={cat.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 z-0"
          />

          <div className="absolute inset-0 flex flex-col justify-end p-5 z-20">
            <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-[0.2em] mb-1 block opacity-0 group-hover:opacity-100 transition-opacity">Pogledaj</span>
              <h3 className="text-lg font-bold leading-tight text-white uppercase tracking-wider drop-shadow-lg">
                {cat.name}
              </h3>
            </div>
          </div>

          <div className="absolute top-3 right-3 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center glass z-30 opacity-0 group-hover:opacity-100 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#FFD700]"><path d="m9 18 6-6-6-6" /></svg>
          </div>
        </button>
      ))}
    </div>
  );
};

export default CategoryList;
