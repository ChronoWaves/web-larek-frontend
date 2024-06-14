import { IOrderForm } from '../types';
import { IEvents } from './base/Events';
import { Form } from './common/Form';
import { EventNames } from './../utils/constants';

export class OrderForm extends Form<IOrderForm> {
	protected _card: HTMLButtonElement;
	protected _cash: HTMLButtonElement;
	protected _address: HTMLInputElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events, EventNames.OrderInputChange);
		this._card = container.elements.namedItem('card') as HTMLButtonElement;
		this._cash = container.elements.namedItem('cash') as HTMLButtonElement;
		this._address = container.elements.namedItem('address') as HTMLInputElement;

		this.setupPaymentListeners();
	}

	clear() {
		this.toggleClass(this._card, 'button_alt-active', false);
		this.toggleClass(this._cash, 'button_alt-active', false);
		this._address.value = '';
	}

	private setupPaymentListeners() {
		this.setupPaymentListener(this._cash, 'cash', this._card);
		this.setupPaymentListener(this._card, 'card', this._cash);
	}

	private setupPaymentListener(buttonToActivate: HTMLButtonElement, paymentType: string, buttonToDeactivate: HTMLButtonElement) {
		buttonToActivate.addEventListener('click', () => {
			this.toggleClass(buttonToActivate, 'button_alt-active', true);
			this.toggleClass(buttonToDeactivate, 'button_alt-active', false);
			this.emitInputChange('payment', paymentType);
		});
	}
}
