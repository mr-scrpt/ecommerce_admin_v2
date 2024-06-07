import { CartRow } from "@/entities/cart";
import { CartRowCreateDTO } from "@/entities/cart/_domain/cartRow.dto";

type CartRowPayload = Pick<CartRow, "cartId" | "productId">;

// type CartRowDTO = Pick<CartRow, "cartId" | "productId" | "quantity">;

export type CartRowCreateTxPayload = {
  cartRowData: CartRowPayload;
};

export type CartRowCreateTxDTO = {
  cartRowData: CartRowCreateDTO["data"];
};
