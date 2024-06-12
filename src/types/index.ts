interface IStoreApi {
	getProductById: (id: string) => Promise<IProduct>;
	getProductList: () => Promise<IProduct[]>;
	submitOrder: (order: IOrder) => Promise<IOrderResult>;
}

interface IProduct {
	id: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
	description: string;
	selected: boolean;
}

interface IPage {
	counter: number;
	catalog: HTMLElement[];
	locked: boolean;
}

interface IAppState {
	catalog: IProduct[];
	basket: IProduct[];
	order: IOrder | null;

	setCatalog(items: IProduct[]): void;
	addItemFromBasket(product: IProduct): void;
	removeItemFromBasket(product: IProduct): void;
	calculateTotalBasketPrice(): number;
}

interface IOrder {
	items: string[];
	payment: string;
	total: number;
	address: string;
	email: string;
	phone: string;
}

interface IOrderResult {
	id: string;
	total: number;
}

interface IPopup {
	content: HTMLElement;
}

interface IBasket {
	list: HTMLElement[];
	total: number;
}

interface IBasketProduct extends IProduct {
	index: number;
}

interface IContactsForm {
	phone: string;
	email: string;
}

interface IOrderForm {
	address: string;
	payment: string;
}

interface IOrderValidate {
	phone: string;
	email: string;
	address: string;
	payment: string;
}

interface ISuccessForm {
	description: number;
}

interface IActions {
	onClick: (event: MouseEvent) => void;
}

interface IFormState {
	valid: boolean;
	errors: string[];
}

type FormErrors = Partial<Record<keyof IOrder, string>>;

export { IStoreApi, IProduct, IPage, IAppState, IOrder, IOrderResult, IPopup, IBasket, IBasketProduct, IContactsForm, IOrderForm, IOrderValidate, ISuccessForm, IActions, IFormState, FormErrors }