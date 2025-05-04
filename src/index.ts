import './scss/styles.scss';
import { SELECTORS, SELECTORS_BASKET } from './components/base/selectors';
import { CatalogPresenter } from './components/controller/CatalogPresenter';
import { ApiService } from './components/model/ApiService';
import { BasketModel } from './components/model/BasketModel';
import { BasketView } from './components/view/modal/basketView';
import { ModalView } from './components/view/modal/modal';
import { cloneTemplate } from './utils/utils';
import { BasketPresenter } from './components/controller/BasketPresenter';
import { PageView } from './components/view/PageCatalog';
import { EventEmitter } from './components/base/events';

const apiService = new ApiService();
const basketModel = new BasketModel();
export const eventBus = new EventEmitter();


const basketView = new BasketView(cloneTemplate(SELECTORS_BASKET.BASKET_TEMPLATE));
const catalogView = new PageView(SELECTORS.GALLERY);
const modalView = new ModalView('.modal');
const basketPresenter = new BasketPresenter(basketView, basketModel, modalView);
const catalogPresenter = new CatalogPresenter(
	apiService,
	catalogView,
	modalView,
);

catalogPresenter.init();
basketPresenter.init();
