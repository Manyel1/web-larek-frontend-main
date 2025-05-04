import { eventBus } from '../..';
import { IProduct } from '../../types/model/model';
import { ensureElement } from '../../utils/utils';
import { BaseView } from '../base/BaseView';
import { SELECTORS } from '../base/selectors';

export class CatalogCard extends BaseView {
	private _title: HTMLElement;
	private _price: HTMLElement;
	private _image: HTMLImageElement;
	private _category: HTMLElement;

	constructor(container: HTMLElement) {
		super(container);
		this._title = ensureElement(SELECTORS.TITLE, container);
		this._price = ensureElement(SELECTORS.PRICE, container);
		this._image = ensureElement<HTMLImageElement>(SELECTORS.IMAGE, container);
		this._category = ensureElement(SELECTORS.CATEGORY, container);
	}

	public setData(product: IProduct): void {
		this._title.textContent = product.title;
		this._price.textContent = product.price ? `${product.price} синапсов` : 'Бесценно';
		this._image.src = product.image;
		this._image.alt = product.title;
		this._category.textContent = product.category;
	}

	public bindClick(product: IProduct): void {
		this.element.addEventListener('click', () => {
			eventBus.emit('catalogCardClicked', product);
		});
	}
}
