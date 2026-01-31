
import React, { useState, useMemo, useEffect } from 'react';
import { AppView, MenuItem, Category } from './types';
import { INITIAL_MENU_DATA, CATEGORY_IMAGES } from './constants';
import Header from './components/Header';
import CategoryList from './components/CategoryList';
import MenuItemList from './components/MenuItemList';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.CATEGORIES);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU_DATA);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoadingFile, setIsLoadingFile] = useState(true);

  useEffect(() => {
    const loadMenuFile = async () => {
      try {
        const response = await fetch('./menu.xlsx');
        if (!response.ok) throw new Error("Fajl menu.xlsx nije pronađen.");

        const arrayBuffer = await response.arrayBuffer();
        // @ts-ignore
        const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        // @ts-ignore
        const data = XLSX.utils.sheet_to_json(worksheet) as any[];

        const validatedData: MenuItem[] = data.map((row: any) => ({
          Naziv: String(row.Naziv || "Nepoznato").trim(),
          Grupa: String(row.Grupa || "Ostalo").trim(),
          Tip: String(row.Tip || "Artikal").trim(),
          JM: String(row.JM || "kom").trim(),
          Cena: parseFloat(row.Cena) || 0
        }));

        if (validatedData.length > 0) {
          setMenuItems(validatedData);
        }
      } catch (err) {
        console.log(err);
        console.warn("Korišćenje default podataka.");
      } finally {
        setIsLoadingFile(false);
      }
    };

    loadMenuFile();
  }, []);

  const categories = useMemo(() => {
    const uniqueGroups = Array.from(new Set<string>(menuItems.map(item => item.Grupa)));

    return uniqueGroups.map(group => {
      // Veoma važno: trim() i toUpperCase() osiguravaju uparivanje sa CATEGORY_IMAGES
      debugger;
      const normalizedKey = group.trim().toUpperCase();
      return {
        id: group,
        name: group,
        imageUrl: CATEGORY_IMAGES[normalizedKey] || `./images/default-category.jpg`
      };
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [menuItems]);

  const filteredItems = useMemo(() => {
    if (!selectedCategory) return [];

    const items = menuItems.filter(item => item.Grupa === selectedCategory);
    const normalizedCategory = selectedCategory.trim().toUpperCase();

    // Posebno sortiranje za toplu sekciju
    if (normalizedCategory === 'TOPLI NAPICI') {
      return [...items].sort((a, b) => {
        const nameA = a.Naziv.toLowerCase();
        const nameB = b.Naziv.toLowerCase();

        const isCoffee = (name: string) =>
          name.includes('kafa') ||
          name.includes('espresso') ||
          name.includes('macchiato') ||
          name.includes('cappuccino') ||
          name.includes('nes') ||
          name.includes('latte') ||
          name.includes('moka') ||
          name.includes('domaca') ||
          name.includes('domaća');

        const isHotChocolate = (name: string) =>
          name.includes('čokolada') ||
          name.includes('cokolada') ||
          name.includes('chocolate');

        const aIsCoffee = isCoffee(nameA);
        const bIsCoffee = isCoffee(nameB);
        const aIsHotCH = isHotChocolate(nameA);
        const bIsHotCH = isHotChocolate(nameB);

        // Prioritet: 
        // 1. Kafe
        // 2. Sve ostalo (Čajevi, vitaminski, itd.)
        // 3. Tople čokolade
        let prioA = 2; // Default su čajevi i ostalo
        if (aIsCoffee) prioA = 1;
        else if (aIsHotCH) prioA = 3;

        let prioB = 2;
        if (bIsCoffee) prioB = 1;
        else if (bIsHotCH) prioB = 3;

        if (prioA !== prioB) {
          return prioA - prioB;
        }

        // Unutar iste grupe, sve sortiramo po ceni (i kafe i čajeve)
        return a.Cena - b.Cena;
      });
    }

    // Sortiranje po ceni za industrijska flaširana piva i žestine
    if (normalizedCategory === 'INDUSTRIJSKA FLASIRANA PIVA' || normalizedCategory === 'ZESTINE') {
      return [...items].sort((a, b) => a.Cena - b.Cena);
    }

    return items;
  }, [selectedCategory, menuItems]);

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setView(AppView.ITEMS);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (view === AppView.ITEMS) {
      setView(AppView.CATEGORIES);
      setSelectedCategory(null);
    }
  };

  return (
    <div className="min-h-screen pb-24 max-w-md mx-auto relative bg-[#050505] selection:bg-amber-500/30">
      <Header
        showBack={view !== AppView.CATEGORIES}
        onBack={handleBack}
      />

      <main className="px-6 pt-8">
        {isLoadingFile && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-6"></div>
            <p className="text-slate-400 text-xs uppercase tracking-[0.3em] font-bold animate-pulse">Učitavanje menija...</p>
          </div>
        )}

        {!isLoadingFile && view === AppView.CATEGORIES && (
          <div className="animate-fade-in">
            <div className="mb-10 text-center">
              <h2 className="text-4xl font-theatre gold-text font-black mb-2 italic">Vreme je za...</h2>
              <div className="flex items-center justify-center gap-3">
                <div className="h-[1px] w-8 bg-indigo-500/30"></div>
                <p className="text-slate-500 text-[10px] tracking-[0.4em] uppercase font-black">Izaberite uživanje</p>
                <div className="h-[1px] w-8 bg-indigo-500/30"></div>
              </div>
            </div>
            <CategoryList
              categories={categories}
              onSelect={handleCategorySelect}
            />
          </div>
        )}

        {!isLoadingFile && view === AppView.ITEMS && selectedCategory && (
          <div className="animate-fade-in">
            <div className="mb-10 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-theatre gold-text font-black uppercase tracking-tight">{selectedCategory}</h2>
                <div className="h-1 w-12 bg-gradient-to-r from-amber-500 to-indigo-500 mt-2 rounded-full"></div>
              </div>
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center glass-card">
                <span className="text-xs text-amber-500 font-bold">{filteredItems.length}</span>
              </div>
            </div>
            <MenuItemList items={filteredItems} />
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-6 pointer-events-none z-50 max-w-md mx-auto">
        <div className="w-full flex justify-center items-center py-3 px-8 glass-card rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/10 backdrop-blur-2xl">
          <span className="text-[10px] uppercase tracking-[0.5em] text-[#FFD700] font-black drop-shadow-md">Teatar Beer Bar 13 &bull; Digitalni Meni</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
