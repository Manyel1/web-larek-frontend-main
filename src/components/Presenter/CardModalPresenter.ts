import { eventBus } from '../..';
import { IProduct } from '../../types/model/model';
import { cloneTemplate } from '../../utils/utils';
import { SELECTORS } from '../base/selectors';
import { AppModel } from '../model/appModel';
import { PreviewCardView } from '../view/modal/cardModalView';
import { ModalView } from '../view/modal/modal';

export class CardModalPresenter {
  constructor(private appModel: AppModel, private modalView: ModalView) {
    eventBus.on('modal:product:open', (product: IProduct | null) => {
      if (!product) return;

      const content = this.renderPreviewCard(product);
      this.modalView.setContent(content);
      this.modalView.open();
    });
  }

  private renderPreviewCard(product: IProduct): HTMLElement {
    const element = cloneTemplate(SELECTORS.PREVIEW_TEMPLATE);
    const previewView = new PreviewCardView(element);

    previewView.setData(product);

	previewView.bindAddToCart(() => {
		eventBus.emit('basket:add', product); 
	  });

    return previewView.element;
  }
}
