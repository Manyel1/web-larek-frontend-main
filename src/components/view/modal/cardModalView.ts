import { eventBus } from "../../..";
import { IProduct } from "../../../types/model/model";
import { ensureElement } from "../../../utils/utils";
import { BaseView } from "../../base/BaseView";
import { SELECTORS } from "../../base/selectors";


export class PreviewCardView extends BaseView {
	private _category: HTMLElement;
	private _title: HTMLElement;
	private _description: HTMLElement;
	private _image: HTMLImageElement;
	private _button: HTMLButtonElement;
	private _price: HTMLElement;

	constructor(container: HTMLElement) {
		super(container);

		this._image = ensureElement<HTMLImageElement>(SELECTORS.IMAGE, container);
		this._category = ensureElement<HTMLElement>(SELECTORS.CATEGORY, container);
		this._title = ensureElement<HTMLElement>(SELECTORS.TITLE, container);
		this._description = ensureElement<HTMLElement>(SELECTORS.DESCRIPTION, container);
		this._button = ensureElement<HTMLButtonElement>(SELECTORS.ADD_BUTTON, container);
		this._price = ensureElement<HTMLElement>(SELECTORS.PRICE, container);

	
	}

	public setData(data: IProduct): void {
		this._category.textContent = data.category;
		this._title.textContent = data.title;
		this._description.textContent = data.description;
		this._image.src = data.image;
		this._image.alt = data.title;
		this._price.textContent =
			data.price !== null ? `${data.price} синапсов` : 'Бесплатно';
	}

	public bindAddToCart(product: IProduct): void {
		this._button.addEventListener('click', () => {
			eventBus.emit('basket:add', product);
		});
	}

	  
}
