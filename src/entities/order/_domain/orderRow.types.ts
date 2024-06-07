// NOTE: Base
export type OrderRowBase = {
  orderId: string;

  productId: string;
  productName: string;
  productArticle: string;
  productImg: string;

  quantity: number;
  price: number;
};

// NOTE: Entity
export type OrderRowEntity = OrderRowBase & {
  id: string;
  createdAt: Date;
};

// NOTE: Projetions
type OrderRowBaseProjection = {
  orderId: string;

  productId: string;
  productName: string;
  productArticle: string;
  productImg: string;

  quantity: number;
  price: number;
};

export type OrderRow = OrderRowBaseProjection & {
  id: string;
  createdAt: Date;
};

// // NOTE: Actions
// export type OrderRowToCreatePayload = {
//   productId: string;
//   quantity: number;
// };
//
// export type OrderRowToAddPayload = {
//   orderId: string;
//   productId: string;
//   quantity: number;
// };
//
// export type OrderRowToUpdateQuantityPayload = {
//   productId: string;
//   quantity: number;
//   orderRowId: string;
// };
//
// export type OrderRowToRemovePayload = {
//   orderRowId: string;
// };
//
// // NOTE: DB
// export type OrderRowToAdd = OrderRowBaseProjection & {};
// export type OrderRowChangeQuantity = {
//   quantity: number;
//   orderRowId: string;
// };

// NOTE: Side
export type OrderProduct = OrderRow & {
  priceOrder: number;
  quantity: number;
};
