import { IBasketProduct, IProduct } from '../../types/model/model';

export class BasketModel {
  private _products: IBasketProduct[] = [];

  public get products(): IBasketProduct[] {
    return this._products;
  }

  public addProduct(product: IProduct): void {
    const existingProduct = this._products.find(p => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this._products.push({ ...product, quantity: 1 });
    }
  }

  public removeProduct(productId: string): void {
	const product = this._products.find(p => p.id === productId);
	if (!product) return;

	if (product.quantity > 1) {
		product.quantity -= 1;
	} else {
		this._products = this._products.filter(p => p.id !== productId);
	}
}

  public getTotalPrice(): number {
    return this._products.reduce(
      (sum, product) => sum + (product.price ?? 0) * product.quantity,
      0
    );
  }
}
