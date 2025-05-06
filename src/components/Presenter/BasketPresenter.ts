import { eventBus } from '../..';
import { IBasketProduct, IProduct } from '../../types/model/model';
import { cloneTemplate } from '../../utils/utils';
import { SELECTORS_BASKET } from '../base/selectors';
import { AppModel } from '../model/appModel';
import { BasketItemView } from '../view/modal/BasketItemView';
import { BasketView } from '../view/modal/basketView';
import { ModalView } from '../view/modal/modal';

export class BasketPresenter {
	private readonly basketView: BasketView;
	private readonly modalView: ModalView;
	private readonly basketModel = this.appModel.basket;

	constructor(
		basketView: BasketView,
		modalView: ModalView,
		private readonly appModel: AppModel
	) {
		this.basketView = basketView;
		this.modalView = modalView;

		this.basketView.onClick(() => eventBus.emit('modal:basket:open'));
		this.registerEvents();
	}

	public getBasketElement(): HTMLElement {
		return this.basketView.element;
	}

	private registerEvents(): void {
		eventBus.on('basket:add', this.onAdd);
		eventBus.on('basket:remove', this.onRemove);
		eventBus.on('modal:basket:open', this.onOpen);
	}

	private onAdd = (product: IProduct): void => {
		this.basketModel.addProduct(product);
		this.refresh();
		this.modalView.close();
	};

	private onRemove = ({ id }: { id: string }): void => {
		this.basketModel.removeProduct(id);
		this.refresh();
	};

	private onOpen = (): void => {
		this.refresh();
		this.modalView.setContent(this.getBasketElement());
		this.modalView.open();
	};

	private refresh(): void {
		const products = this.basketModel.products;
		this.basketView.renderBasket(this.createItems(products));
		this.basketView.updateTotalPrice(this.basketModel.getTotalPrice());
		this.basketView.updateCounter(
			products.reduce((sum, p) => sum + p.quantity, 0)
		);
	}

	private createItems(products: IBasketProduct[]): HTMLElement[] {
		return products.map((item, idx) => {
			const wrapper = cloneTemplate<HTMLElement>(SELECTORS_BASKET.BASKET_CARD);
			wrapper.id = item.id;
			const view = new BasketItemView(wrapper);
			view.setData(item, idx);
			return view.element;
		});
	}
}
