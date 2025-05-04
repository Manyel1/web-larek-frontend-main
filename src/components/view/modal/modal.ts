import { eventBus } from "../../..";
import { ensureElement } from "../../../utils/utils";
import { BaseView } from "../../base/BaseView";
import { SELECTORS_MODAL } from "../../base/selectors";


export class ModalView extends BaseView {
  private _closeButton: HTMLElement;
  private _contentContainer: HTMLElement;

  constructor(selector: string) {
    super(selector);

    this._closeButton = ensureElement(SELECTORS_MODAL.MODAL_CLOSE, this.element);
    this._contentContainer = ensureElement(SELECTORS_MODAL.MODAL_CONTENT, this.element);

    this._closeButton.addEventListener('click', () => this.close());
  }

  public open(): void {
    this.element.classList.add('modal_active');
  }

  public close(): void {
    this.element.classList.remove('modal_active');
    eventBus.emit('modalClosed'); 
  }

  public setContent(content: HTMLElement): void {
    this._contentContainer.innerHTML = '';
    this._contentContainer.appendChild(content);
  }

  public clearContent(): void {
    this._contentContainer.innerHTML = '';
  }

  public get contentContainer(): HTMLElement {
    return this._contentContainer;
  }
}
