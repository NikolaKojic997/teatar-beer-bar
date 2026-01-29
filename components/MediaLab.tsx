
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const CATEGORY_PROMPTS: Record<string, { prompt: string, filename: string }> = {
  "KRAFT TOCENA PIVA": {
    prompt: "Cinematic close-up of a craft beer glass with thick foam, condensation, dark mahogany bar top, theatrical moody lighting, gold highlights, luxury pub atmosphere, 4k professional photography",
    filename: "kraft-tocena.jpg"
  },
  "KAFE I ČAJEVI": {
    prompt: "Elegant espresso cup with crema and a steaming teapot, dark moody cafe background, warm theatrical spotlight, golden hour accents, luxury setting, 4k",
    filename: "kafe-cajevi.jpg"
  },
  "ZESTINE": {
    prompt: "Luxury whiskey and spirits in crystal glasses, dramatic low-key lighting, dark ambient bar, sophisticated atmosphere, golden reflections, 4k",
    filename: "zestine.jpg"
  },
  "INDUSTRIJSKA FLASIRANA PIVA": {
    prompt: "Classy arrangement of premium beer bottles, ice cold condensation, cinematic bar lighting, dark background, professional product photography, 4k",
    filename: "flasirana-piva.jpg"
  },
  "GAZIRANI I NEGAZIRANI SOKOVI": {
    prompt: "Gourmet fruit juices in tall glasses, ice cubes, vibrant colors against dark theatrical background, cinematic lighting, gold rim accents, 4k",
    filename: "sokovi.jpg"
  },
  "VINA": {
    prompt: "Sophisticated wine glasses with red and white wine, dark cellar background, cinematic theatrical lighting, elegant gold highlights, 4k",
    filename: "vina.jpg"
  },
  "INDUSTRIJSKA TOCENA PIVA": {
    prompt: "Cold draft beer glass, perfect pour, theatrical lighting, dark moody bar background, high contrast, 4k",
    filename: "industrijska-tocena.jpg"
  },
  "HRANA": {
    prompt: "Artistic platter of gourmet pub food and appetizers, moody lighting, dark wood table, theatrical presentation, gold accents, 4k",
    filename: "hrana.jpg"
  },
  "SEJKOVI": {
    prompt: "Indulgent milkshakes with whipped cream and toppings, dessert photography, cinematic moody lighting, dark background, 4k",
    filename: "sejkovi.jpg"
  }
};

const MediaLab: React.FC = () => {
  const [generating, setGenerating] = useState<string | null>(null);
  const [images, setImages] = useState<Record<string, string>>({});

  const generateImage = async (category: string) => {
    setGenerating(category);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: CATEGORY_PROMPTS[category].prompt }],
        },
        config: {
          imageConfig: { aspectRatio: "4:5" }
        },
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          setImages(prev => ({ ...prev, [category]: imageUrl }));
          break;
        }
      }
    } catch (err) {
      console.error(err);
      alert("Greška pri generisanju slike.");
    } finally {
      setGenerating(null);
    }
  };

  const downloadImage = (category: string) => {
    const url = images[category];
    const filename = CATEGORY_PROMPTS[category].filename;
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="animate-in fade-in zoom-in duration-500 pb-20">
      <div className="mb-6">
        <h2 className="text-2xl font-theatre gold-text font-bold uppercase tracking-widest">Media Lab</h2>
        <p className="text-gray-400 text-xs leading-tight mt-2">
          Izgeneriši profesionalne slike za svoj Teatar Meni. Preuzmi ih i ubaci u <code className="text-white">images/</code> folder.
        </p>
      </div>

      <div className="grid gap-4">
        {Object.keys(CATEGORY_PROMPTS).map((cat) => (
          <div key={cat} className="glass rounded-2xl p-4 border border-white/5 flex items-center gap-4">
            <div className="w-20 h-24 bg-black/40 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
              {images[cat] ? (
                <img src={images[cat]} className="w-full h-full object-cover" alt={cat} />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-700"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h4 className="text-[11px] font-bold gold-text uppercase tracking-widest mb-1">{cat}</h4>
              <p className="text-[9px] text-gray-500 font-mono mb-3">{CATEGORY_PROMPTS[cat].filename}</p>
              
              <div className="flex gap-2">
                {!images[cat] ? (
                  <button 
                    onClick={() => generateImage(cat)}
                    disabled={generating !== null}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] font-bold uppercase tracking-wider text-white border border-white/10 disabled:opacity-50 transition-all"
                  >
                    {generating === cat ? "Generišem..." : "Generiši Sliku"}
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={() => generateImage(cat)}
                      disabled={generating !== null}
                      className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] font-bold uppercase tracking-wider text-white border border-white/10"
                    >
                      Ponovo
                    </button>
                    <button 
                      onClick={() => downloadImage(cat)}
                      className="px-3 py-1.5 bg-[#D4AF37] hover:bg-[#B38728] rounded-lg text-[10px] font-bold uppercase tracking-wider text-black transition-all shadow-lg"
                    >
                      Preuzmi
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaLab;
