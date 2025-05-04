export interface IProduct {
	id: string;
	title: string;
	description: string;
	price: number | null;
	image: string;
	category: CardCategory;
}

export interface IBasketProduct extends IProduct {
	quantity: number;
  }
  

export const CARD_CATEGORIES = {
	'софт-скил': 'card__category_soft',
	'хард-скил': 'card__category_hard',
	дополнительное: 'card__category_additional',
	другое: 'card__category_other',
	кнопка: 'card__category_button',
} as const;

export type CardCategory = keyof typeof CARD_CATEGORIES;


export interface ICatalogCardData {
	title: string;
	price: number;
	image: string;
	category: string;
}



export interface IPreviewCardData {
	id: string;
	category: string;
	title: string;
	description: string;
	image: string;
	priceText: string;   // вот это поле
  }