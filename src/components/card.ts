import { Component } from './base/component';
import { IProduct, IActions } from '../types';

export class Card extends Component<IProduct> {
	protected _image: HTMLImageElement;
	protected _title: HTMLElement;
	protected _category: HTMLElement;
	protected _price: HTMLElement;
	protected _description: HTMLElement;
	protected _button?: HTMLButtonElement;

	private categoryClassMap = new Map<string, string>([
		['софт-скил', 'card__category_soft'],
		['другое', 'card__category_other'],
		['хард-скил', 'card__category_hard'],
		['дополнительное', 'card__category_additional'],
		['кнопка', 'card__category_button']
	]);

	constructor(container: HTMLElement, actions?: IActions) {
		super(container);
		this._image = this.container.querySelector('.card__image');
		this._title = this.container.querySelector('.card__title');
		this._category = this.container.querySelector('.card__category');
		this._price = this.container.querySelector('.card__price');
		this._description = this.container.querySelector('.card__text');
		this._button = this.container.querySelector(`.card__button`);

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set category(value: string) {
		this.setText(this._category, value);
		this._category.className = '';

		const categoryClass = this.categoryClassMap.get(value);
		if (categoryClass) {
			this._category.classList.add(categoryClass);
		}
	}

	set price(value: number | null) {
		this.setText(
			this._price,
			value ? `${value.toString()} синапсов` : 'Бесценно'
		);
	}

	get price(): number {
		return Number(this._price.textContent) || 0;
	}

	set description(value: string) {
		this.setText(this._description, value);
	}

	set button(value: string) {
		if (this._price.textContent === 'Бесценно') {
			this._button.disabled = true;
			this.setText(this._button, 'Нельзя купить');
		} else this.setText(this._button, value);
	}

	set selected(value: boolean) {
		this.toggleButtonLabel(value);
	}

	toggleButtonLabel(selected: boolean) {
		if (selected) {
			this.button = 'Убрать из корзины';
		} else {
			this.button = 'В корзину';
		}
	}
}

export class CardPreview extends Card {
	protected _description: HTMLElement;
	constructor(container: HTMLElement, actions?: IActions) {
		super(container, actions);
		this._description = container.querySelector('.card__text');
	}

	set description(value: string) {
		this.setText(this._description, value);
	}
}