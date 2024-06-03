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
- src/styles/styles.scss — корневой файл стилей
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
## Интерфейсы

### interface IApi 
Позволяет получить список карточек с сервера.
`getProductById` - Получить продукт по ID.
`getProductList` - Получить список продуктов.
`orderProduct` - Cоздание заказа.

### interface IPage
Описывает страницу сайта
`counter: number` - Счётчик товаров в корзине.
`catalog: HTMLElement[]` - Массив товаров.
`locked: boolean `- Блокировка страницы.

### interface IAppState 
Состояние приложение.
`catalog: IProduct[]` - Массив товаров.
`basket: IProduct[]` - Корзина товаров.
`order: IOrder | null` - Информация о товаре.

### interface IProduct
Поля карточки товара.
`id: string` - Идентификатор товара.
`title: string` - Название товара.
`category: string` - Категория товара.
`image: string` - Изображение товара.
`price: number | null` - Цена товара.
`description: string` - Описание товара.
`selected: boolean` - Выбран ли товар.

### interface IOrder
Информация о заказе.
`items: string[]` - Массив идентификаторов товаров.
`payment: string` - Способ оплаты.
`total: number` - Сумма заказа.
`address: string` - Адрес.
`email: string` - Электронная почта.
`phone: string` - Номер телефона.

### interface IOrderResult
Результат успешной покупки.
`id: string` - Идентификатор заказа.
`total: number` - Сумма заказа.

### interface IContactsForm
Форма с контактами.
`phone: string` - Номер телефона.
`email: string` - Электронная почта.

### interface IOrderForm
Форма с оплатой.
`address: string` - Адрес.
`payment: string` - Способ оплаты.

### interface IOrderFormValidate 
Валидация формы.
`phone: string;`- Номер телефона.
`email: string;` - Электронная почта.
`address: string;` - Адрес.
`payment: string;` - Способ оплаты.

### interface IOrderFormSuccess
Форма успешного заказа.
`description: number;` - сумма списанных средст.

## Классы

### class Component
Является абстрактным и предназначен для наследования.

### class AppState
Хранит состояние приложения.
`catalog: Product[]` - Каталог товаров.
`basket: Product[]` - Список товаров в корзине.
`order: IOrder` - Заказ.

### class Product
Выводит товар и информацию о нем.
`title: HTMLElement` - Заголовок товара.
`description: HTMLElement` - Описание товара.
`image: HTMLImageElement` - Изображение товара.
`category: HTMLElement` - Категория товара.
`price: HTMLElement` - Стоимость товара.
`button: HTMLButtonElement` - Кнопка карточки товара.

### class Page
Главная страница сайта.
`wrapper: HTMLElement` - Главная страница.
`catalog: HTMLElement` - Каталога товаров.
`basket: HTMLElement` - Корзина.
`counter: HTMLElement` - Cчетчик товаров в корзине.

### class Basket
Отображает информацию по заказу.
`list: HTMLElement` - Cписок товаров в корзине.
`total: HTMLElement` - Общая стоимость товаров в корзине.
`button: HTMLElement `- Кнопка оформления заказа.

### class Popup
Отвечает за попапы.
`content: HTMLElement` - Содержимое попапа.
`closeButton: HTMLButtonElement` - Кнопка закрытия попапа.

### class Form
Форма оформления заказа.
`emailInput: HTMLButtonElement` - Поле электронной почты.
`phoneInput: HTMLElement` - Поле номера телефона.

### class Order
Форма оплаты заказа.

### class SuccessOrder
Успешная оплата заказа.
`total: HTMLElement` - Отображения описания успешного заказа.
`close: HTMLElement` - Кнопка закрытия об успешном заказе.
