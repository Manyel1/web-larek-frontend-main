// presenter/CatalogPresenter.ts
import { ApiService } from '../model/ApiService';
import { CatalogCard } from '../view/cardView';
import { CardModalPresenter } from './CardModalPresenter';
import { cloneTemplate } from '../../utils/utils';
import { SELECTORS } from '../base/selectors';
import { ModalView } from '../view/modal/modal';
import { PageView } from '../view/PageCatalog';

export class CatalogPresenter {
	private apiService: ApiService;
	private view: PageView;

	constructor(
		apiService: ApiService,
		view: PageView,
		cardModalView: ModalView
	) {
		this.apiService = apiService;
		this.view = view;
		new CardModalPresenter(cardModalView);
	}

	public async init(): Promise<void> {
		const products = await this.apiService.getProducts();
		this.view.clear();

		products.forEach((product) => {
			const cardElement = cloneTemplate<HTMLButtonElement>(SELECTORS.CATALOG);
			const cardView = new CatalogCard(cardElement);
			cardView.bindClick(product);
			cardView.setData(product);

			this.view.append(cardView.element);
		});
	}
}
