import { OrderRowToAddPayload } from "@/entities/order/_domain/orderRow.types";

export type OrderRowAddComplexible = OrderRowToAddPayload;
export type OrderRowChangeQuantityComplexible = {
  productId: string;
  orderRowId: string;
  quantity: number;
};
