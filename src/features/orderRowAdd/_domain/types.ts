import { OrderRowToAddPayload } from "@/entities/order/";
import { ProductToSelect } from "@/entities/product";

export type OrderRowAddComplexible = OrderRowToAddPayload;

export type OrderProductGroup = {
  available: Array<ProductToSelect>;
  inOrder: Array<ProductToSelect>;
  outOfStock: Array<ProductToSelect>;
};

export type OrderProductAdd = {
  productId: string;
  quantity: number;
};
