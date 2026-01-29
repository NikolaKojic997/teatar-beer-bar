
export interface MenuItem {
  Naziv: string;
  Grupa: string;
  Tip: string;
  JM: string;
  Cena: number;
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
}

export enum AppView {
  CATEGORIES = 'CATEGORIES',
  ITEMS = 'ITEMS'
}
