import { EventEmitter } from "./events";


export abstract class BaseView extends EventEmitter {
	protected _element: HTMLElement;

	constructor(selector: string | HTMLElement) {
		super(); 
		this._element = typeof selector === 'string'
			? document.querySelector(selector)!
			: selector;
	}

	public get element(): HTMLElement {
		return this._element;
	}
}
