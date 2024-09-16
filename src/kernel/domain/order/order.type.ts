import { type Order as OrderDBType } from "@prisma/client";

import { OrderRow } from "./orderRow.type";

export { OrderDBType };

// NOTE: Base
export type OrderBase = {
  orderNo: string;
  userId: string;
  receiverId: string;
  orderStatusStateId: string;
  orderStatusPaymentId: string;
  priceTotal: number;
};

// NOTE: Entity
export type OrderEntity = OrderBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

// export type OrderCompositeEntity = OrderEntity & {
//   orderRowList: Array<OrderRowEntity>;
// };

// NOTE: Projetions
export type Order = OrderBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

// TODO: Strange type - check property and property item exemple
// export type OrderComposite = Order & {
//   orderRowList: Array<OrderRow>;
// };
