import { Cart } from "@/entities/cart";
import { Product } from "@/entities/product";

type CartData = {
  cartId: Cart["id"];
};

type CartRowData = {
  cartId: Cart["id"];
  productId: Product["id"];
};

export type CartRowRemoveTxPayload = {
  // cartData: CartData;
  cartRowData: CartRowData;
};

export type CartRowRemoveTxDTO = {
  // cartData: CartData;
  cartRowData: CartRowData;
};
