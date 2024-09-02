import { OrderRowEntity } from "@/kernel/domain/order/orderRow.type";
import { Product } from "@/kernel/domain/product/product.type";
import { OrderRow } from "@prisma/client";

// NOTE: Relations
export type OrderRowRelation = OrderRow & {
  product: Product;
};

export type OrderRowRelationEntity = OrderRowEntity & {
  product: Product;
  createdAt: Date;
  updatedAt: Date;
};

// NOTE: Selector
export type OrderRowGetSelector = {
  id: string;
};

export type OrderRowGetByOrderSelector = {
  orderId: string;
};
