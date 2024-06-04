import { Cart } from "@/entities/cart";
import { Product } from "@/entities/product";

type CartData = {
  cartId: Cart["id"];
};
type CartProduct = {
  productId: Product["id"];
};

export type CartRowAddTxPayload = {
  cartData: CartData;
  cartRowData: CartProduct;
};

export type CartRowAddTxDTO = {
  cartData: CartData;
  cartRowData: CartProduct;
};
