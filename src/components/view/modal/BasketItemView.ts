  import { IBasketProduct } from '../../../types/model/model';
import { eventBus } from '../../..';
import { ensureElement } from '../../../utils/utils';
import { SELECTORS, SELECTORS_BASKET } from '../../base/selectors';

  export class BasketItemView {
    private title: HTMLElement;
    private price: HTMLElement;
    private deleteBtn: HTMLButtonElement;
    private index: HTMLElement;

    constructor(public element: HTMLElement) {
      this.title = ensureElement(SELECTORS.TITLE, element);
      this.price = ensureElement(SELECTORS.PRICE, element);
      this.deleteBtn = ensureElement(SELECTORS_BASKET.BASKET_ITEM_DELETE,element) as HTMLButtonElement;
      this.index = ensureElement(SELECTORS_BASKET.BASKET_ITEM_INDEX, element);

      this.deleteBtn.addEventListener('click', () => {
        const id = this.element.id;
        eventBus.emit('basket:remove', {id});
      });
    }

    public setData(product: IBasketProduct, index: number): void {
      this.title.textContent = product.title;
      this.price.textContent = product.price
        ? `${product.price} синапсов x ${product.quantity}`
        : 'Бесценно';
      this.index.textContent = `${index + 1}`;
    }

   

    get elementId() {
      return this.element.id;
    }
  }
