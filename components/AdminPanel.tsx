
import React, { useState } from 'react';
import { MenuItem } from '../types';

interface AdminPanelProps {
  onUpdate: (items: MenuItem[]) => void;
  onReset: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onUpdate, onReset }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setMessage("Analiziram Excel fajl...");

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const bstr = event.target?.result;
        // @ts-ignore
        const workbook = XLSX.read(bstr, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        // @ts-ignore
        const data = XLSX.utils.sheet_to_json(worksheet) as any[];

        const validatedData: MenuItem[] = data.map((row: any) => ({
          Naziv: row.Naziv || "Nepoznato",
          Grupa: row.Grupa || "Ostalo",
          Tip: row.Tip || "Artikal",
          JM: row.JM || "kom",
          Cena: parseFloat(row.Cena) || 0
        }));

        if (validatedData.length > 0) {
          onUpdate(validatedData);
          setMessage("PREGLED: Uspešno učitano! Da bi promene bile trajne, ovaj fajl moraš fizički nazvati 'menu.xlsx' i staviti ga u glavni folder projekta.");
        } else {
          setMessage("Nije pronađen nijedan validan artikal u fajlu.");
        }
      } catch (err) {
        console.error(err);
        setMessage("Greška prilikom obrade fajla. Proverite format.");
      } finally {
        setLoading(false);
      }
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="glass rounded-2xl p-6 border-gold-border/20 border space-y-8 animate-in fade-in zoom-in duration-300 mb-10">
      <section>
        <h2 className="text-xl font-theatre gold-text font-bold mb-4">Upravljanje Podacima</h2>

        <div className="space-y-6">
          <div className="p-4 bg-yellow-900/10 border border-yellow-900/30 rounded-xl">
            <h4 className="text-[10px] uppercase font-bold gold-text mb-1">VAŽNO UPUTSTVO</h4>
            <p className="text-[11px] text-gray-400 leading-tight">
              Ova aplikacija čita podatke direktno iz fajla <code className="text-white">menu.xlsx</code> koji se nalazi u folderu aplikacije.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-white">Testiraj novi fajl (Preview)</label>
            <p className="text-xs text-gray-400 mb-4">
              Odaberi fajl da vidiš kako će izgledati, a zatim ga fizički zameni u folderu.
            </p>

            <div className="relative">
              <input
                type="file"
                accept=".xls,.xlsx"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                disabled={loading}
              />
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-xl p-8 hover:bg-white/5 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="gold-text mb-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
                <span className="text-sm font-medium text-gray-300 text-center">Odaberi Excel fajl za preview</span>
                {loading && <span className="mt-2 text-xs gold-text animate-pulse">Obrađujem...</span>}
              </div>
            </div>
          </div>

          {message && (
            <div className={`p-4 rounded-lg text-xs font-medium border ${message.includes('Greška') ? 'bg-red-900/10 border-red-900/50 text-red-400' : 'bg-blue-900/10 border-blue-900/50 text-blue-300'}`}>
              {message}
            </div>
          )}
        </div>
      </section>

      <section className="pt-6 border-t border-white/10">
        <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">Fizički folderi</h3>
        <ul className="text-[11px] text-gray-400 space-y-2 list-disc pl-4">
          <li>Glavni podaci: <code className="text-gold-border">menu.xlsx</code></li>
          <li>Slike kategorija: <code className="text-gold-border">images/ime-kategorije.jpg</code></li>
          <li>Ikonice pića: <code className="text-gold-border">images/icons/beer.jpg</code> itd.</li>
        </ul>
      </section>
    </div>
  );
};

export default AdminPanel;
