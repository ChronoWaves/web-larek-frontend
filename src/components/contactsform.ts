import { IContactsForm } from '../types';
import { IEvents } from './base/events';
import { Form } from './common/form';

export class ContactsForm extends Form<IContactsForm> {
	protected _phone: HTMLInputElement;
	protected _email: HTMLInputElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._phone = container.elements.namedItem('phone') as HTMLInputElement;
		this._email = container.elements.namedItem('email') as HTMLInputElement;
	}

	clear() {
		this._phone.value = '';
		this._email.value = '';
	}
}
