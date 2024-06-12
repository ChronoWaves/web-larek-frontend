import { IOrderForm } from '../types';
import { IEvents } from './base/events';
import { Form } from './common/form';

export class OrderForm extends Form<IOrderForm> {
	protected _card: HTMLButtonElement;
	protected _cash: HTMLButtonElement;
	protected _address: HTMLInputElement;

	constructor(container: HTMLFormElement, protected events: IEvents) {
		super(container, events);
		this._card = container.elements.namedItem('card') as HTMLButtonElement;
		this._cash = container.elements.namedItem('cash') as HTMLButtonElement;
		this._address = container.elements.namedItem('address') as HTMLInputElement;

		this.setupPaymentListeners();
	}

	clear() {
		this.togglePaymentButton(this._card, false);
		this.togglePaymentButton(this._cash, false);
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
			this.onInputChange('payment', paymentType);
		});
	}

	private togglePaymentButton(button: HTMLButtonElement, isActive: boolean) {
		button.classList.toggle('button_alt-active', isActive);
	}
}
