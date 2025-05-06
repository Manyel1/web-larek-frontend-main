import { eventBus } from '../..';

export class ModalModel {
  private _data:  | null = null;

  public setData(type: ModalType, data: any): void {
    this._data =  data ;;
    eventBus.emit(`modal:${type}:open`, this._data);
  }


  public clear(type: ModalType, data: any): void {
    this._data =  null ;;
    eventBus.emit(`modal:${type}:open`, this._data);
  }


  public getData(): any | null {
    return this._data;
  }
}

export type ModalType = 
  | 'product' 
  | 'productModal' 
  | 'basket' 
  | 'form'
  | 'custom';
