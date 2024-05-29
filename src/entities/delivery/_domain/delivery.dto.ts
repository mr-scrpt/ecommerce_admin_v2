import { DeliveryBase } from "./delivery.types";

// NOTE: Queries
export type DeliveryGetDTO = {
  deliveryId: string;
};

export type DeliveryGetByOrderDTO = {
  orderId: string;
};

// NOTE: Mutations
export type DeliveryCreateDTO = DeliveryBase;
export type DeliveryUpdateDTO = Partial<DeliveryBase> & {
  deliveryId: string;
};
export type DeliveryRemoveDTO = {
  deliveryId: string;
};

export type DeliveryRemoveBySlugDTO = {
  slug: string;
};

export type DeliveryAddProductListDTO = {
  deliveryId: string;
  productListId: Array<{ id: string }>;
};

export type DeliveryAddPropertyListDTO = {
  deliveryId: string;
  propertyListId: Array<{ id: string }>;
};
