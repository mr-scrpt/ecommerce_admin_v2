import { Cart, CartRow } from "@/entities/cart";
import { Product } from "@/entities/product";

// type CartData = {
// };

type CartRowData = {
  cartId: Cart["id"];
  productId: Product["id"];
  quantity: CartRow["quantity"];
};

export type CartRowUpdateTxPayload = {
  // cartData: CartData;
  cartRowData: CartRowData;
};

export type CartRowUpdateTxDTO = {
  // cartData: CartData;
  cartRowData: CartRowData;
};
