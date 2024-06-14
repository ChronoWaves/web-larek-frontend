import { IBasket, IBasketProduct, IActions } from '../types';
import { Component } from './base/Component';
import { IEvents } from './base/Events';
import { ensureElement } from '../utils/utils';

export class Basket extends Component<IBasket> {
    protected _list: HTMLElement;
    protected _total: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this._button = ensureElement<HTMLButtonElement>('.basket__button', container);
        this._total = ensureElement<HTMLSpanElement>('.basket__price', container);
        this._list = ensureElement<HTMLElement>('.basket__list', container);

        this._button.addEventListener('click', () => this.events.emit('basket:order'));
    }

    set total(price: number) {
        this.setText(this._total, `${price} синапсов`);
    }

    set list(items: HTMLElement[]) {
        this._list.replaceChildren(...items);
        this.setDisabled(this._button, !items.length);
    }

    refreshItemIndices() {
        Array.from(this._list.children).forEach((item, index) => {
            const indexInItem = item.querySelector('.basket__item-index') as HTMLElement | null;
            this.setText(indexInItem, index + 1);
        });
    }

    toggleButton(isDisabled: boolean) {
        this.setDisabled(this._button, isDisabled);
    }
}

export class ProductItemBasket extends Component<IBasketProduct> {
    protected _index: HTMLElement;
    protected _title: HTMLElement;
    protected _price: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: IActions) {
        super(container);
        this._title = ensureElement<HTMLElement>('.card__title', container);
        this._index = ensureElement<HTMLElement>('.basket__item-index', container);
        this._price = ensureElement<HTMLElement>('.card__price', container);
        this._button = ensureElement<HTMLButtonElement>('.basket__item-delete', container);

        this._button.addEventListener('click', (evt) => {
            this.container.remove();
            actions?.onClick(evt);
        });
    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    set index(value: number) {
        this.setText(this._index, value);
    }

    set price(value: number) {
        this.setText(this._price, `${value} синапсов`);
    }
}