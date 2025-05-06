export const SELECTORS = {
	GALLERY: '.gallery',
	CARD: '.card',
	TITLE: '.card__title',
	PRICE: '.card__price',
	IMAGE: '.card__image',
	CATEGORY: '.card__category',
	CATALOG: '#card-catalog',
	DESCRIPTION: '.card__text',
	ADD_BUTTON: '.card__button',
	PREVIEW_TEMPLATE: '#card-preview',
} as const;
export const SELECTORS_BASKET = {
	BASKET_DELETE: '.basket__item-delete',
	BASKET_PRICE: '.basket__price',
	BASKET_BUTTON: '.basket__button',
	BASKET_LIST: '.basket__list',
	BASKET_CARD: '#card-basket',
	BASKET_ITEM_INDEX: '.basket__item-index',
	BASKET_CARD_TITLE: '.card__title',
	BASKET_CARD_PRICE: '.card__price',
	BASKET_ITEM_DELETE: '.basket__item-delete',
	BASKET_BTN: '.header__basket',
	BASKET_TEMPLATE: '#basket',
	BASKET_COUNTER: '.header__basket-counter',
	BASKET_CHECKOUT: '.basket__button',
} as const;

export const SELECTORS_MODAL = {
	MODAL_CONTAINER_ID: '#modal-container',
	MODAL_CONTAINER: '.modal__container',
	MODAL_CLOSE: '.modal__close',
	MODAL_CONTENT: '.modal__content',
	MODAL: '.modal',
} as const;
export const SELECTORS_DELIVERY = {
	MODAL_DELIVERY_PAYMENT: '.button[name]',
	MODAL_DELIVERY_ADDRESS: 'input[name="address"]',
	MODAL_DELIVERY_BTN: '.order__button',
	MODAL_DELIVERY_ERROR: '.form__errors',
} as const;
