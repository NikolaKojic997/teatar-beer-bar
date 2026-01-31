
import { MenuItem } from './types';

export const INITIAL_MENU_DATA: MenuItem[] = [
  { Naziv: "AKIRA TOCENO PIVO 0.3", Grupa: "KRAFT TOCENA PIVA", Tip: "Pice", JM: "lit", Cena: 340.00 },
  { Naziv: "AKIRA TOCENO PIVO 0.5", Grupa: "KRAFT TOCENA PIVA", Tip: "Mesano/Koktel", JM: "lit", Cena: 440.00 },
  { Naziv: "ČAJ ALIBABA", Grupa: "TOPLI NAPICI", Tip: "Pice", JM: "kom", Cena: 110.00 },
  { Naziv: "ATLANTIC VODKA", Grupa: "ZESTINE", Tip: "Pice", JM: "kom", Cena: 130.00 },
  { Naziv: "B5 IPA TOCENO PIVO 0.5", Grupa: "KRAFT TOCENA PIVA", Tip: "Mesano/Koktel", JM: "lit", Cena: 440.00 },
  { Naziv: "BANJALUCKO PIVO 0.5", Grupa: "INDUSTRIJSKA FLASIRANA PIVA", Tip: "Pice", JM: "kom", Cena: 170.00 },
  { Naziv: "BOROVNICA SOK 0.2", Grupa: "GAZIRANI I NEGAZIRANI SOKOVI", Tip: "Pice", JM: "kom", Cena: 200.00 },
  { Naziv: "ESPRESSO KAFA", Grupa: "TOPLI NAPICI", Tip: "Pice", JM: "kom", Cena: 140.00 },
  { Naziv: "VODKA ABSOLUT", Grupa: "ZESTINE", Tip: "Pice", JM: "kom", Cena: 200.00 },
  { Naziv: "WHISKEY JACK DANIEL'S", Grupa: "ZESTINE", Tip: "Pice", JM: "kom", Cena: 350.00 },
  { Naziv: "TIKVES SMEDEREVKA 1L", Grupa: "VINA", Tip: "Pice", JM: "kom", Cena: 1100.00 },
  { Naziv: "JUMBO MIX", Grupa: "HRANA", Tip: "Hrana", JM: "kom", Cena: 240.00 },
  { Naziv: "PLAZMA SEJK", Grupa: "SEJKOVI", Tip: "Mesano/Koktel", JM: "kg", Cena: 200.00 }
];

export const CATEGORY_IMAGES: Record<string, string> = {
  "KRAFT TOCENA PIVA": "/images/kraft-tocena.jpg",
  "TOPLI NAPICI": "/images/kafe-cajevi.jpg",
  "ZESTINE": "/images/zestine.jpg",
  "INDUSTRIJSKA FLASIRANA PIVA": "/images/flasirana-piva.jpg",
  "GAZIRANI I NEGAZIRANI SOKOVI": "/images/sokovi.jpg",
  "VINA": "/images/vina.jpg",
  "VINA FLASICE": "/images/vina.jpg",
  "INDUSTRIJSKA TOCENA PIVA": "/images/industrijska-tocena.jpg",
  "HRANA": "/images/hrana.jpg",
  "SEJKOVI": "/images/sejkovi.jpg"
};
