import { eventBus } from '../..';
import { IProduct } from '../../types/model/model';
import { cloneTemplate } from '../../utils/utils';
import { SELECTORS } from '../base/selectors';
import { PreviewCardView } from '../view/modal/cardModalView';
import { ModalView } from '../view/modal/modal';

export class CardModalPresenter {
	constructor(private modalView: ModalView) {
		eventBus.on('catalogCardClicked', (data: IProduct) => {
			this.show(data);
		});
	}

	public show(product: IProduct): void {
		const element = cloneTemplate(SELECTORS.PREVIEW_TEMPLATE).cloneNode(true) as HTMLElement;
		const previewView = new PreviewCardView(element);

		previewView.setData(product);
		previewView.bindAddToCart(product);
		this.modalView.setContent(previewView.element);
		this.modalView.open();
	}
}
