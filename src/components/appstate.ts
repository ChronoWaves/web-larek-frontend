import { Model } from './base/Model';
import { FormErrors, IAppState, IOrder, IOrderValidate, IProduct } from '../types/index';
import { EventNames } from './../utils/constants';

export class Product extends Model<IProduct> {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	status: boolean;
	price: number | null;
	selected: boolean;
}

export class AppState extends Model<IAppState> {
	basket: Product[] = [];
	catalog: Product[] = [];
	order: IOrder = this.getEmptyOrder();
	formErrors: FormErrors = {};

	setCatalog(items: IProduct[]) {
		this.catalog = items.map((item) => new Product(item, this.events));
		this.emitChanges(EventNames.CatalogChanged, { catalog: this.catalog });
	}

	addItemFromBasket(product: Product) {
		this.basket.push(product);
	}

	removeItemFromBasket(product: Product) {
		this.basket = this.basket.filter((item) => item.id !== product.id);
	}

	calculateTotalBasketPrice() {
		return this.basket.reduce((total, item) => total + (item.price ?? 0), 0);
	}

	getEmptyOrder(): IOrder {
		return {
			payment: '',
			address: '',
			email: '',
			phone: '',
			items: [],
			total: 0,
		};
	}

	getProductCountInBasket() {
		return this.basket.length;
	}

	setOrderFields(field: keyof IOrderValidate, value: string) {
		this.order[field] = value;

		if (!this.validateOrder() || !this.validateContacts()) {
			return;
		}
	}

	validateOrder(): boolean {
		const errors: typeof this.formErrors = {};
	
		if (!this.order.address) {
		  errors.address = 'Необходимо указать адрес';
		}
		if (!this.order.payment) {
		  errors.payment = 'Необходимо выбрать способ оплаты';
		}
	
		this.formErrors = errors;
		this.events.emit(EventNames.OrderFormErrorsChange, this.formErrors);
	
		return Object.keys(errors).length === 0;
	  }
	
	  validateContacts(): boolean {
		const errors: typeof this.formErrors = {};
	
		if (!this.order.email) {
		  errors.email = 'Необходимо указать email';
		}
	
		if (!this.order.phone) {
		  errors.phone = 'Необходимо указать телефон';
		}
	
		this.formErrors = errors;
		this.events.emit(EventNames.ContactsFormErrorsChange, this.formErrors);
	
		return Object.keys(errors).length === 0;
	  }

	addBasketItemsToOrder(): void {
		this.order.items = this.basket.map((product) => product.id);
	}

	clearBasket(): void {
		this.basket = [];
	}

	resetCatalogItems(): void {
		this.catalog.forEach((product) => {
			product.selected = false;
		});
	}

	clearOrder(): void {
		this.order = this.getEmptyOrder();
	}
}
