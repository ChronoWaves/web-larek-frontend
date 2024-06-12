import { Component } from './base/component';
import { IEvents } from './base/events';
import { ensureElement } from '../utils/utils';
import { IPage } from '../types/index';

export class Page extends Component<IPage> {
	protected _counter: HTMLElement;
	protected _gallery: HTMLElement;
	protected _wrapper: HTMLElement;
	protected _basket: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._counter = ensureElement<HTMLElement>('.header__basket-counter', container);
		this._gallery = ensureElement<HTMLElement>('.gallery', container);
		this._wrapper = ensureElement<HTMLElement>('.page__wrapper', container);
		this._basket = ensureElement<HTMLElement>('.header__basket', container);

		this.setupBasketClickListener();
	}

	set counter(value: number) {
		this.setText(this._counter, String(value));
	}

	set gallery(items: HTMLElement[]) {
		this._gallery.replaceChildren(...items);
	}

	set locked(value: boolean) {
		this.toggleLock(value);
	}

	private setupBasketClickListener() {
		this._basket.addEventListener('click', () => {
			this.events.emit('basket:open');
		});
	}

	private toggleLock(isLocked: boolean) {
		this._wrapper.classList.toggle('page__wrapper_locked', isLocked);
	}
}
