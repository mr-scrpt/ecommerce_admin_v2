import { CartRow, CartRowCreateDTO } from "@/entities/cart";
import { Session } from "next-auth";

type CartRowPayload = Pick<CartRow, "productId">;

export type CartRowCreateTxPayload = {
  cartRowData: CartRowPayload;
  sessionData: Session;
};

export type CartRowCreateTxDTO = {
  cartRowData: CartRowCreateDTO["data"];
};
