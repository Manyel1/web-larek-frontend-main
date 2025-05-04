import { BaseView } from '../base/BaseView';
import {  SELECTORS } from '../base/selectors';

export class PageView extends BaseView {
	private _gallery: HTMLElement;

	constructor(Selector: string = SELECTORS.GALLERY,) {
		super(Selector);
		this._gallery = this.element;
	}

	public clear(): void {
		this._gallery.innerHTML = '';
	}

	public append(child: HTMLElement): void {
		this._gallery.appendChild(child);
	}

	
}


