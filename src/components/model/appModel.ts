import { Api } from '../base/api';
import { Products } from './Products';
import { BasketModel } from './BasketModel';
import { ModalModel } from './modal';

export class AppModel {
  public products: Products;
  public basket: BasketModel;
  public modal: ModalModel;

  constructor(api: Api) {
    this.products = new Products(api);
    this.basket = new BasketModel();
    this.modal = new ModalModel();
  }
}
