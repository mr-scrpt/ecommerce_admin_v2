import { Cart, CartRow, CartRowUpdateDTO } from "@/entities/cart";
import { Product } from "@/entities/product";

type CartRowPayload = Pick<CartRow, "quantity">;

export type CartRowUpdateTxPayload = {
  selector: CartRowUpdateSelector;
  cartRowData: CartRowPayload;
};

export type CartRowUpdateTxDTO = {
  selector: CartRowUpdateSelector;
  cartRowData: CartRowUpdateDTO["data"];
};

// NOTE: Selector
export type CartRowUpdateSelector = {
  cartId: Cart["id"];
  productId: Product["id"];
};
