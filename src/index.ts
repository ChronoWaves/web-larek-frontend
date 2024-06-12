import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { ensureElement, cloneTemplate } from './utils/utils';
import { Page } from './components/page';
import { StoreApi } from './components/storeapi';
import { Card, CardPreview } from './components/card';
import { AppState, Product } from './components/appstate';
import { Popup } from './components/common/popup';
import { Basket, ProductItemBasket } from './components/basket';
import { OrderForm } from './components/orderform';
import { IContactsForm, IOrderForm, IOrderResult, IOrderValidate } from './types';
import { ContactsForm } from './components/contactsform';
import { SuccessForm } from './components/successform';

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderFormTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const events = new EventEmitter();
const api = new StoreApi(CDN_URL, API_URL);
const appStateManager = new AppState({}, events);

const page = new Page(document.body, events);
const popup = new Popup(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const orderForm = new OrderForm(cloneTemplate(orderFormTemplate), events);
const contactsForm = new ContactsForm(cloneTemplate(contactsTemplate), events);
const successForm = new SuccessForm(cloneTemplate(successTemplate), {
		onClick: () => popup.close(),
	}
);

const handleApiError = (error: unknown) => {
    if (error instanceof Error) {
        console.error('API Error:', error.message);
    } else {
        console.error('Unknown API Error:', error);
    }
};


const fetchProductList = async () => {
	try {
		const productList = await api.getProductList();
		appStateManager.setCatalog(productList);
	} catch (error) {
		handleApiError(error);
	}
};

const setGallery = () => {
	page.gallery = appStateManager.catalog.map((product) => {
		const card = new Card(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', product),
		});
		return card.render({
			title: product.title,
			image: product.image,
			price: product.price,
			category: product.category,
		});
	});
};

events.on('catalog:changed', setGallery);

events.on('card:select', (product: Product) => {
	page.locked = true;
	const productItemPreview = new CardPreview(
		cloneTemplate(cardPreviewTemplate),
		{
			onClick: () => {
				const action = product.selected ? 'basket:removeFromBasket' : 'card:addToBasket';
				events.emit(action, product);
				productItemPreview.toggleButtonLabel(product.selected);
			},
		}
	);
	popup.render({
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
		const productItem = new ProductItemBasket(cloneTemplate(cardBasketTemplate), {
				onClick: () => events.emit('basket:removeFromBasket', item),
			}
		);
		return productItem.render({
			title: item.title,
			price: item.price,
			index: index + 1,
		});
	});
	popup.render({
		content: basket.render({
			list: basketItems,
			total: appStateManager.calculateTotalBasketPrice(),
		}),
	});
});

events.on('basket:order', () => {
	popup.render({
		content: orderForm.render({
			address: '',
			payment: '',
			valid: false,
			errors: [],
		}),
	});
});

events.on('popup:close', () => {
	page.locked = false;
});

events.on('orderInput:change', (data: { field: keyof IOrderForm; value: string }) => {
	appStateManager.setOrderFields(data.field, data.value);
});

events.on('orderFormErrors:change', (errors: Partial<IOrderValidate>) => {
	const { payment, address } = errors;
	orderForm.valid = !payment && !address;
	orderForm.errors = Object.values({ payment, address })
		.filter((i) => !!i)
		.join('; ');
});

events.on('order:submit', () => {
	appStateManager.order.total = appStateManager.calculateTotalBasketPrice();
	appStateManager.addBasketItemsToOrder();
	popup.render({
		content: contactsForm.render({
			valid: false,
			errors: [],
		}),
	});
});

events.on('contactsFormErrors:change', (errors: Partial<IContactsForm>) => {
	const { email, phone } = errors;
	contactsForm.valid = !email && !phone;
	contactsForm.errors = Object.values({ phone, email })
		.filter((i) => !!i)
		.join('; ');
});

events.on('contacts:submit', () => {
	api
		.submitOrder(appStateManager.order)
		.then((res) => {
			events.emit('order:success', res);
			appStateManager.clearBasket();
			appStateManager.clearOrder();
			page.counter = 0;
			appStateManager.resetCatalogItems();
			orderForm.clear();
			contactsForm.clear();
		})
		.catch((err) => {
			console.error(err);
		});
});

events.on('order:success', (res: IOrderResult) => {
	popup.render({
		content: successForm.render({
			description: res.total,
		}),
	});
});

const initializeApp = async () => {
	await fetchProductList();
};

initializeApp();
