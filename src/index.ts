import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { ensureElement, cloneTemplate } from './utils/utils';
import { Page } from './components/page';
import { LarekApi } from './components/larekapi';
import { Card, CardPreview } from './components/card';
import { AppState, Product } from './components/appstate';
import { Modal } from './components/common/modal';
import { Basket, ProductItemBasket } from './components/basket';
import { OrderForm } from './components/orderform';
import { IContactsForm, IOrderForm, IOrderResult, IOrderValidate } from './types';
import { ContactsForm } from './components/contactsform';
import { SuccessForm } from './components/successform';

const templates = {
  cardCatalog: ensureElement<HTMLTemplateElement>('#card-catalog'),
  cardPreview: ensureElement<HTMLTemplateElement>('#card-preview'),
  cardBasket: ensureElement<HTMLTemplateElement>('#card-basket'),
  basket: ensureElement<HTMLTemplateElement>('#basket'),
  orderForm: ensureElement<HTMLTemplateElement>('#order'),
  contacts: ensureElement<HTMLTemplateElement>('#contacts'),
  success: ensureElement<HTMLTemplateElement>('#success'),
};

const events = new EventEmitter();
const api = new LarekApi(CDN_URL, API_URL);
const appStateManager = new AppState({}, events);
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(templates.basket), events);
const orderForm = new OrderForm(cloneTemplate(templates.orderForm), events);
const contactsForm = new ContactsForm(cloneTemplate(templates.contacts), events);
const successForm = new SuccessForm(cloneTemplate(templates.success), {
  onClick: () => modal.close(),
});

const setupEventHandlers = () => {
  events.on('catalog:changed', () => {
    page.catalog = appStateManager.catalog.map((item) => {
      const card = new Card(cloneTemplate(templates.cardCatalog), {
        onClick: () => events.emit('card:select', item),
      });
      return card.render({
        title: item.title,
        image: item.image,
        price: item.price,
        category: item.category,
      });
    });
  });

  events.on('card:select', (product: Product) => {
    page.locked = true;
    const productItemPreview = new CardPreview(cloneTemplate(templates.cardPreview), {
      onClick: () => {
        if (product.selected) {
          events.emit('basket:removeFromBasket', product);
        } else {
          events.emit('card:addToBasket', product);
        }
        productItemPreview.toggleButtonLabel(product.selected);
      },
    });
    modal.render({
      content: productItemPreview.render({
        id: product.id,
        title: product.title,
        image: product.image,
        category: product.category,
        description: product.description,
        price: product.price,
        selected: product.selected,
      }),
    });
  });

  events.on('card:addToBasket', (product: Product) => {
    appStateManager.addItemFromBasket(product);
    product.selected = true;
    page.counter = appStateManager.getProductCountInBasket();
  });

  events.on('basket:removeFromBasket', (product: Product) => {
    appStateManager.removeItemFromBasket(product);
    product.selected = false;
    basket.total = appStateManager.calculateTotalBasketPrice();
    page.counter = appStateManager.getProductCountInBasket();
    basket.refreshItemIndices();
    if (appStateManager.getProductCountInBasket() == 0) {
      basket.toggleButton(true);
    }
  });

  events.on('basket:open', () => {
    page.locked = true;
    const basketItems = appStateManager.basket.map((item, index) => {
      const productItem = new ProductItemBasket(cloneTemplate(templates.cardBasket), {
        onClick: () => events.emit('basket:removeFromBasket', item),
      });
      return productItem.render({
        title: item.title,
        price: item.price,
        index: index + 1,
      });
    });
    modal.render({
      content: basket.render({
        list: basketItems,
        total: appStateManager.calculateTotalBasketPrice(),
      }),
    });
  });

  events.on('basket:order', () => {
    modal.render({
      content: orderForm.render({
        address: '',
        payment: '',
        valid: false,
        errors: [],
      }),
    });
  });

  events.on('modal:close', () => {
    page.locked = false;
  });

  events.on('orderInput:change', (data: { field: keyof IOrderForm; value: string }) => {
    appStateManager.setOrderFields(data.field, data.value);
  });

  events.on('orderFormErrors:change', (errors: Partial<IOrderValidate>) => {
    const { payment, address } = errors;
    orderForm.valid = !payment && !address;
    orderForm.errors = Object.values({ payment, address }).filter(Boolean).join('; ');
  });

  events.on('order:submit', () => {
    appStateManager.order.total = appStateManager.calculateTotalBasketPrice();
    appStateManager.addBasketItemsToOrder();
    modal.render({
      content: contactsForm.render({
        valid: false,
        errors: [],
      }),
    });
  });

  events.on('contactsFormErrors:change', (errors: Partial<IContactsForm>) => {
    const { email, phone } = errors;
    contactsForm.valid = !email && !phone;
    contactsForm.errors = Object.values({ phone, email }).filter(Boolean).join('; ');
  });

  events.on('contacts:submit', () => {
    api.submitOrder(appStateManager.order)
      .then((res) => {
        events.emit('order:success', res);
        appStateManager.clearBasket();
        appStateManager.clearOrder();
        page.counter = 0;
        appStateManager.resetCatalogItems();
        orderForm.clear();
        contactsForm.clear();
      })
      .catch(console.log);
  });

  events.on('order:success', (res: IOrderResult) => {
    modal.render({
      content: successForm.render({
        description: res.total,
      }),
    });
  });
};

api.getProductList()
  .then(appStateManager.setCatalog.bind(appStateManager))
  .catch(console.log);

setupEventHandlers();