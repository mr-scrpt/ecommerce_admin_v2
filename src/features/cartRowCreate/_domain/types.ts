import { Cart } from "@/entities/cart";
import { Product } from "@/entities/product";

type CartData = {
  cartId: Cart["id"];
};

type CartProduct = {
  cartId: Cart["id"];
  productId: Product["id"];
};

export type CartRowCreateTxPayload = {
  // cartData: CartData;
  cartRowData: CartProduct;
};

export type CartRowCreateTxDTO = {
  // cartData: CartData;
  cartRowData: CartProduct;
};
