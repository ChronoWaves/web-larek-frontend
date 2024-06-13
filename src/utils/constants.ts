export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {

};

export enum Events {
    CatalogChanged = 'catalog:changed',
    CardSelect = 'card:select',
    CardAddToBasket = 'card:addToBasket',
    BasketRemoveFromBasket = 'basket:removeFromBasket',
    BasketOpen = 'basket:open',
    BasketOrder = 'basket:order',
    ModalOpen = 'modal:open',
    ModalClose = 'modal:close',
    OrderInputChange = 'orderInput:change',
    ContactsInputChange = 'contactsInput:change',
    OrderFormErrorsChange = 'orderFormErrors:change',
    OrderSubmit = 'order:submit',
    ContactsFormErrorsChange = 'contactsFormErrors:change',
    ContactsSubmit = 'contacts:submit',
    OrderSuccess = 'order:success',
  }

  export const EventNames = {
    CatalogChanged: Events.CatalogChanged,
    CardSelect: Events.CardSelect,
    CardAddToBasket: Events.CardAddToBasket,
    BasketRemoveFromBasket: Events.BasketRemoveFromBasket,
    BasketOpen: Events.BasketOpen,
    BasketOrder: Events.BasketOrder,
    ModalOpen: Events.ModalOpen,
    ModalClose: Events.ModalClose,
    OrderInputChange: Events.OrderInputChange,
    ContactsInputChange: Events.ContactsInputChange,
    OrderFormErrorsChange: Events.OrderFormErrorsChange,
    OrderSubmit: Events.OrderSubmit,
    ContactsFormErrorsChange: Events.ContactsFormErrorsChange,
    ContactsSubmit: Events.ContactsSubmit,
    OrderSuccess: Events.OrderSuccess,
  };
  