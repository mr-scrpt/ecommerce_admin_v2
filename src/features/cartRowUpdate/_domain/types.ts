import { CartRowUpdateDTO } from "@/entities/cart";
import { Cart } from "@/kernel/domain/cart/cart.type";
import { CartRow } from "@/kernel/domain/cart/cartRow.type";
import { Product } from "@/kernel/domain/product/product.type";

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
