import { IProduct } from "../../types/model/model";


export class ApiService {
	private baseUrl = 'https://larek-api.nomoreparties.co/api/weblarek';
	private cdnUrl = 'https://larek-api.nomoreparties.co/content/weblarek';

	async getProducts(): Promise<IProduct[]> {
		const response = await fetch(`${this.baseUrl}/product/`);
		if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

		const data = await response.json();

		return data.items.map((product: IProduct) => ({
			...product,
			image: this.cdnUrl + product.image,
		}));
	}
}
