import { cloneTemplate } from '../../utils/utils';
import { SELECTORS } from '../base/selectors';
import { AppModel } from '../model/appModel';
import { CardView } from '../view/cardView';
import { PageView } from '../view/PageCatalog';
import { eventBus } from '../..';

export class CatalogPresenter {
  private view: PageView;
  private appModel: AppModel;

  constructor(appModel: AppModel, view: PageView) {
    this.appModel = appModel;
    this.view = view;

	
    this.appModel.products.load().then(() => {
		eventBus.emit('catalog:loaded');
    });
	
	eventBus.on('catalog:loaded', this.render);
  }

  private render = (): void => {
    const products = this.appModel.products.getAll();
    this.view.clear();

    products.forEach(product => {
      const cardEl = cloneTemplate<HTMLButtonElement>(SELECTORS.CATALOG);
      const cardView = new CardView(cardEl);
      cardView.setData(product);
      cardView.onClick(() => {
        this.appModel.modal.setData('product', product);
      });
      this.view.append(cardView.element);
    });
  }
}
