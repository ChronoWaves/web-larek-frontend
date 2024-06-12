# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```


## Об архитектуре 
Взаимодействия внутри приложения происходят через события. Модели инициализируют события, слушатели событий в основном коде выполняют передачу данных компонентам отображения, а также вычислениями между этой передачей, и еще они меняют значения в моделях.


## Интерфейсы.

### Для получения карточек с сервера используется interface IStoreApi.
```
export interface IStoreApi {
	getProductId: (id: string) => Promise<IProduct>; - Получить товар по ID.
	getProductList: () => Promise<IProduct[]>; - Получить список товаров.
	submitOrder: (order: IOrder) => Promise<IOrderResult>; -  Создание заказа.
}
```

### Для описания страницы используется interface IPage.
```
interface IPage {
	counter: number; - Счетчик товаров в корзине.
	catalog: HTMLElement[]; - Массив карточек с товарами.
	locked: boolean; - Блокировка прокрутки страницы.
}
```

### Для описания состояния приложения используется interface IAppState.
```
interface IAppState {
	catalog: IProduct[]; - Каталог товаров.
	basket: IProduct[]; - Корзина.
	order: IOrder | null; - Заказ.
}
```

### Для описания товара используется interface IProduct.
```
interface IProduct {
    id: string; - Идентификатор товара.
    title: string; - Название товара.
    category: string; - Категория товара.
	image: string; - Ссылка на изображение.
	price: number | null; - Сумма товара.
	description: string; - Описание товара.
	selected: boolean; - Выбранный товар.
}
```

### Для описания заказа используется interface IOrder.
```
interface IOrder {
	items: string[]; - Массив товаров.
	payment: string; - Способ оплаты.
	total: number; - Сумма заказа.
	address: string; - Адрес.
	email: string; - Электронная почта.
	phone: string; - Номер телефона.
}
```

### Для описания покупки используется interface IOrderResult.
```
interface IOrderResult {
	id: string; - Идентификатор заказа.
	total: number; - Сумма заказа.
}
```

### Для описания попапа используется interface IPopup.
```
interface IPopup {
	content: HTMLElement; - Попап.
}
```

### Для описания формы ввода контактов используется interface IContactsForm.
```
interface IContactForm {
	phone: string; - Телефон.
	email: string; - Электронная почта.
}
```

### Для описания формы оплаты используется interface IOrderForm.
```
interface IOrderForm {
	address: string; - Адрес.
	payment: string; - Способ оплаты.
}
```

### Для описания корзины используется interface IBasket.
```
interface IBasket {
	items: HTMLElement[]; - Массив с товарами.
	total: number; - Общая сумма товаров.
}
```

### Для описания успешной формы заказакор используется interface ISuccessForm.
```
interface ISuccessForm {
	total: number; - Сумма списанных средств.
}
```

## Классы.

### сlass Model<T>
Абстрактный класс для хранения данных поступающих с сервера.

Методы:
- `сhanges` — Сообщение об изменении.

### class Component<T>
Абстрактный класс для работы с DOM-элементами.

Методы:
- `setText` - Установка текстового содержимого.
- `setImage` - Установка изображения.
- `toggleClass` - Переключение класса.
- `setVisible` - Показать элемент.
- `setHidden` - Скрыть элемент.
- `render` — Принимает данные и возвращает DOM-элемент.

### class AppState
 Отвечает за хранение состояния приложения, наследуется от класса Model и дополняется интерфейсом IAppState.

Свойства:
- `catalog: Product[]` - Каталог товаров.
- `basket: Product[]` - Список товаров в корзине.
- `order: IOrder` - Заказ.

Методы:
- `addItemFromBasket` - Добавление товара в корзину.
- `removeItemFromBasket` - Удаление товара из корзины.
- `clearBasket` - Очистка корзины.
- `setCatalog` - Каталог товаров.
- `validateOrder` - Валидация формы оплаты.
- `validateContacts` - Валидация формы контактов.

### class Product
Отвечает за храние информацию о товаре, наследуется от класса Model и дополняется интерфейсом IProduct.

Свойства:
- `title: HTMLElement` - Заголовок товара.
- `description: HTMLElement` - Описание товара.
- `image: HTMLImageElement` - Изображение товара.
- `category: HTMLElement` - Категория товара.
- `price: HTMLElement` - Стоимость товара.
- `button: HTMLButtonElement` - Кнопка карточки товара.

### class Page
Отвечает за отображение главной страницы, наследуется от класса Component и дополняется интерфейсом IPage.

Свойства:
- `wrapper: HTMLElement` - Главная страница.
- `catalog: HTMLElement` - Каталога товаров.
- `basket: HTMLElement` - Корзина.
- `counter: HTMLElement` - Cчетчик товаров в корзине.

Методы:
- `set counter` - Устанавливает счетчик на корзине.
- `set catalog` - Устанавливает каталог товаров.
- `set locked` - Блокировка прокрутки страницы при открытии попапа.

###  class Basket
Отвечает за работу с корзиной, наследуется от класса Component и дополняется интерфейсом IBasket.

Свойства:
- `_list: HTMLElement` - Cписок товаров в корзине.
- `_total: HTMLElement` - Общая стоимость товаров в корзине.
- `_button: HTMLElement` - Кнопка оформления заказа.

Методы:
- `set total` - Отображает итоговую стоимость товаров в корзине.
- `set list` - Отображает содержимое в корзине.
- `toggleButton` - Переключение состояния кнопки.

### class Popup
Отвечает за работу с попапами, наследуется от класса Component и дополняется интерфейсом IPopup. 

Свойства:
- `_button: HTMLButtonElement` - Содержимое попапа.
- `_content: HTMLElement` - Кнопка закрытия попапа.

Методы:
- `set content` - Определяет содержимое попапа.
- `open` - Открытие попапа.
- `close` - Закрытие попапа.
- `render` - Переопределяет метод, принимает объект с данными и возвращает DOM-элемент.

### class Form<T>
Отвечает за работу с формой заказа, наследуется от класса Component и дополняется интерфейсом IOrderFormValidate.

Методы:
- `valid` - Определяет состояние кнопки.
- `errors` - Сообщает об ошибке.
- `render` - Принимает объект с данными и возвращает DOM-элемент.

### class SuccessForm>
Отвечает за успешную форму оплаты заказа.

Свойства:
- `_button: HTMLButtonElement` - Отображения описания успешного заказа.
- `_description: HTMLElement` - Кнопка закрытия об успешном заказе.

Методы:
- `set description` - Устанавливает описание стоимости заказа.
- `setupButtonClickListener` - Устанавливает слушатель.