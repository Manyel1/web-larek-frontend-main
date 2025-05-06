import { IProduct } from '../../types/model/model';
import { Api } from '../base/api';

export class Products {
	private _items: IProduct[] = [];
	private api: Api;

	constructor(api: Api) {
		this.api = api;
	}

	public load(): Promise<void> {
		return this.api.getProducts().then(products => {
		  this._items = products;
		});
	  }

	public getAll(): IProduct[] {
		return this._items;
	}

	public getById(id: string): IProduct | undefined {
		return this._items.find((product) => product.id === id);
	}
}
