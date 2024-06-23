import { Cart } from "@/kernel/domain/cart/cart.type";
import { Product } from "@/kernel/domain/product/product.type";

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
