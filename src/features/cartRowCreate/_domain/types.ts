import { Cart } from "@/kernel/domain/cart/cart.type";
import { CartRowCreateDTO } from "@/kernel/domain/cart/cartRow.dto";
import { CartRow } from "@/kernel/domain/cart/cartRow.type";
import { Session } from "next-auth";

type CartRowPayload = Pick<CartRow, "productId">;

export type CartRowCreateTxPayload = {
  cartRowData: CartRowPayload;
  sessionData: Session;
};

export type CartRowCreateTxDTO = {
  target: CartRowCreateTarget;
  cartRowData: CartRowCreateDTO["data"];
};

// NOTE: Target
export type CartRowCreateTarget = {
  cartId: Cart["id"];
};
