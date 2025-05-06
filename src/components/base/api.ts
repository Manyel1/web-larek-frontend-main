import { IProduct } from '../../types/model/model';

export type ApiListResponse<Type> = {
	total: number;
	items: Type[];
};

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export class Api {
	private baseUrl: string;
	private cdnUrl: string;
	protected options: RequestInit;

	constructor(baseUrl: string, cdnUrl: string, options: RequestInit = {}) {
		this.baseUrl = baseUrl;
		this.cdnUrl = cdnUrl;
		this.options = {
			headers: {
				'Content-Type': 'application/json',
				...((options.headers as object) ?? {}),
			},
		};
	}

	protected handleResponse(response: Response): Promise<object> {
		if (response.ok) return response.json();
		else
			return response
				.json()
				.then((data) => Promise.reject(data.error ?? response.statusText));
	}

	get(uri: string) {
		return fetch(this.baseUrl + uri, {
			...this.options,
			method: 'GET',
		}).then(this.handleResponse);
	}

	post(uri: string, data: object, method: ApiPostMethods = 'POST') {
		return fetch(this.baseUrl + uri, {
			...this.options,
			method,
			body: JSON.stringify(data),
		}).then(this.handleResponse);
	}
	public async getProducts(): Promise<IProduct[]> {
		const response = await fetch(`${this.baseUrl}/product/`);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();
		return data.items.map((product: IProduct) => ({
			...product,
			image: this.cdnUrl + product.image,
		}));
	}
}
