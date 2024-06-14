import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/Events';
import { IModal } from '../../types';
import { EventNames } from '../../utils/constants';

export class Modal extends Component<IModal> {
	protected _button: HTMLButtonElement;
	protected _content: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._button = ensureElement<HTMLButtonElement>('.modal__close', container);
		this._content = ensureElement<HTMLElement>('.modal__content', container);

		this._button.addEventListener('click', this.close.bind(this));
		this.container.addEventListener('click', this.close.bind(this));
		this._content.addEventListener('click', (evt) => evt.stopPropagation());

		document.addEventListener('keydown', this._handleEscape);
	}

	set content(value: HTMLElement) { 
		this._content.replaceChildren(value); 
	} 

	open() {
		this._toggleModal(true);
		this.events.emit(EventNames.ModalOpen);
	}

	close() {
		this._toggleModal(false);
		this.content = null;
		this.events.emit(EventNames.ModalClose);
	}

	render(data: IModal): HTMLElement {
		super.render(data);
		this.open();
		return this.container;
	}

	_toggleModal(state: boolean = true) {
		this.toggleClass(this.container, 'modal_active', state);
	}

	_handleEscape = (evt: KeyboardEvent) => {
		if (evt.key === 'Escape') {
			this.close();
		}
	};
}
