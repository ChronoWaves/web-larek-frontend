import { IOrderForm } from '../types';
import { IEvents } from './base/events';
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
		this._card.classList.remove('button_alt-active');
		this._cash.classList.remove('button_alt-active');
		this._address.value = '';
	}

	private setupPaymentListeners() {
		this.setupPaymentListener(this._cash, 'cash', this._card);
		this.setupPaymentListener(this._card, 'card', this._cash);
	}

	private setupPaymentListener(buttonToActivate: HTMLButtonElement, paymentType: string, buttonToDeactivate: HTMLButtonElement) {
		buttonToActivate.addEventListener('click', () => {
			this.togglePaymentButton(buttonToActivate, true);
			this.togglePaymentButton(buttonToDeactivate, false);
			this.emitInputChange('payment', paymentType);
		});
	}

	private togglePaymentButton(button: HTMLButtonElement, isActive: boolean) {
		button.classList.toggle('button_alt-active', isActive);
	}
}
