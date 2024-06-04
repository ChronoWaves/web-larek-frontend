export interface IApi {
	getProductId: (id: string) => Promise<IProduct>;
	getProductList: () => Promise<IProduct[]>;
	orderProduct: (order: IOrder) => Promise<IOrderResult>;
}

export interface IPage {
	counter: number;
	catalog: HTMLElement[];
	locked: boolean;
}

export interface IAppState {
	catalog: IProduct[];
	basket: IProduct[];
	order: IOrder | null;
}

export interface IProduct {
	id: string;
    title: string;
    category: string;
	image: string;
	price: number | null;
	description: string;
	selected: boolean;
}

export interface IOrder {
	items: string[];
	payment: string;
	total: number;
	address: string;
	email: string;
	phone: string;
}

export interface IOrderResult {
	id: string;
	total: number;
}

export interface IContactForm {
	phone: string;
	email: string;
}

export interface IOrderForm {
	address: string;
	payment: string;
}

export interface IPopup {
	content: HTMLElement;
}

export interface IBasket {
	items: HTMLElement[];
	total: number;
}

export interface IOrderFormValidate extends IContactForm, IOrderForm {
	errors: HTMLElement
	submit: HTMLButtonElement
}

export interface IOrderFormSuccess {
	total: number;
}