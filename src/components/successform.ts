import { ISuccessForm, IActions } from '../types';
import { ensureElement } from '../utils/utils';
import { Component } from './base/component';

export class SuccessForm extends Component<ISuccessForm> {
	protected _button: HTMLButtonElement;
	protected _description: HTMLElement;

	constructor(container: HTMLElement, actions?: IActions) {
		super(container);
		this._button = ensureElement<HTMLButtonElement>('.order-success__close', container);
		this._description = ensureElement<HTMLElement>('.order-success__description', container);

		this.setupButtonClickListener(actions);
	}


	set description(value: number) {
		this.setText(this._description, 'Списано ' + value + ' синапсов');
	}

	private setupButtonClickListener(actions?: IActions) {
		if (actions?.onClick) {
			this._button.addEventListener('click', actions.onClick);
		}
	}
}