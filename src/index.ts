import './scss/styles.scss';
import { SELECTORS } from './components/base/selectors';
import { CatalogPresenter } from './components/Presenter/CatalogPresenter';
import { ModalView } from './components/view/modal/modal';
import { PageView } from './components/view/PageCatalog';
import { EventEmitter } from './components/base/events';
import { Api } from './components/base/api';
import { CardModalPresenter } from './components/Presenter/CardModalPresenter';
import { AppModel } from './components/model/appModel';
import { config } from './utils/constants';
import { BasketPresenter } from './components/Presenter/BasketPresenter';
import { BasketView } from './components/view/modal/basketView';
import { cloneTemplate } from './utils/utils';


export const eventBus = new EventEmitter();

const api = new Api(config.baseUrl, config.contentUrl);
const appModel = new AppModel(api);

const modal = new ModalView('.modal');
const catalogView = new PageView(SELECTORS.GALLERY);
const basketView = new BasketView(cloneTemplate('#basket'))

const catalogPresenter = new CatalogPresenter(appModel, catalogView);
const cardModalPresenter = new CardModalPresenter(appModel,modal);
const basketPresenter = new BasketPresenter(basketView,modal,appModel)
