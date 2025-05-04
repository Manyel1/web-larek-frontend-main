import { eventBus } from '../..';
import { IBasketProduct, IProduct } from '../../types/model/model';
import { cloneTemplate } from '../../utils/utils';
import { SELECTORS_BASKET } from '../base/selectors';
import { BasketModel } from '../model/BasketModel';
import { BasketItemView } from '../view/modal/BasketItemView';
import { BasketView } from '../view/modal/basketView';
import { ModalView } from '../view/modal/modal';

export class BasketPresenter {
	private readonly basketView: BasketView;
	private readonly basketModel: BasketModel;
	private readonly modalView: ModalView;

	constructor(
		basketView: BasketView,
		basketModel: BasketModel,
		modalView: ModalView
	) {
		this.basketView = basketView;
		this.basketModel = basketModel;
		this.modalView = modalView;

		eventBus.on('basket:open', () => this.onBasketButtonClick());
		eventBus.on('basket:add', (product: IProduct) => {
			this.addProduct(product);
			modalView.close();
		});
		eventBus.on('basket:remove', (product: { id: string }) => {
			this.removeProduct(product.id);
		});
	}

	public async init(): Promise<void> {
		this.updateView();
	}

	private updateView(): void {
		this.basketView.renderBasket(
			this.createBasketItems(this.basketModel.products)
		);
		this.basketView.updateTotalPrice(this.basketModel.getTotalPrice());
		this.basketView.updateCounter(this.getTotalQuantity());
	}

	private getTotalQuantity(): number {
		return this.basketModel.products.reduce((sum, p) => sum + p.quantity, 0);
	}

	private createBasketItems(products: IBasketProduct[]): HTMLElement[] {
		return products.map((product, index) => {
			const element = cloneTemplate<HTMLElement>(SELECTORS_BASKET.BASKET_CARD);
			element.id = product.id;
			const itemView = new BasketItemView(element);

			itemView.setData(product, index);

			return itemView.element;
		});
	}

	private removeProduct(id: string): void {
		this.basketModel.removeProduct(id);
		this.updateView();
	}

	private onBasketButtonClick(): void {
		this.modalView.setContent(this.basketView.element);
		this.modalView.open();
	}

	public addProduct(product: IProduct): void {
		this.basketModel.addProduct(product);
		this.updateView();
	}
}
