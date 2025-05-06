// view/modal/basketView.ts
import { eventBus } from '../../..';
import { ensureElement } from '../../../utils/utils';
import { BaseView } from '../../base/BaseView';
import { SELECTORS_BASKET } from '../../base/selectors';

export class BasketView extends BaseView {
	private _basketList: HTMLElement;
	private _basketPrice: HTMLElement;
	private counterElement: HTMLElement;

	constructor(container: HTMLElement) {
		super(container);

		this._basketList = ensureElement(
			SELECTORS_BASKET.BASKET_LIST,
			this.element
		);
		this._basketPrice = ensureElement(
			SELECTORS_BASKET.BASKET_PRICE,
			this.element
		);
		this.counterElement = ensureElement(SELECTORS_BASKET.BASKET_COUNTER);

		ensureElement(
			SELECTORS_BASKET.BASKET_CHECKOUT,
			this.element
		).addEventListener('click', () => {
			eventBus.emit('basket:checkout');
		});
	}

	public renderBasket(items: HTMLElement[]): void {
		this._basketList.innerHTML = '';
		items.forEach((item) => this._basketList.appendChild(item));
	}

	public updateCounter(count: number): void {
		this.counterElement.textContent = String(count);
	}

	public updateTotalPrice(price: number): void {
		this._basketPrice.textContent = `${price} синапсов`;
	}

	public onClick(callback: () => void): void {
		const basketBtn = ensureElement(SELECTORS_BASKET.BASKET_BTN);
		basketBtn.addEventListener('click', () => callback());
	}
}
