import { Cart } from "@/entities/cart";
import { Product } from "@/entities/product";

export type CartRowRemoveTxPayload = {
  selector: CartRowRemoveSelector;
};

export type CartRowRemoveTxDTO = {
  selector: CartRowRemoveSelector;
};

// NOTE: Selector
export type CartRowRemoveSelector = {
  cartId: Cart["id"];
  productId: Product["id"];
};
