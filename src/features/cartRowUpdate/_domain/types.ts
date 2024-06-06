import { Cart, CartRow } from "@/entities/cart";
import { Product } from "@/entities/product";

type CartRowData = {
  quantity: CartRow["quantity"];
};

export type CartRowUpdateTxPayload = {
  selector: CartRowUpdateSelector;
  cartRowData: CartRowData;
};

export type CartRowUpdateTxDTO = {
  selector: CartRowUpdateSelector;
  cartRowData: CartRowData;
};

// NOTE: Selector
export type CartRowUpdateSelector = {
  cartId: Cart["id"];
  productId: Product["id"];
};
