import { CartRelationEntity } from "@/entities/cart";
import { CartRowCreateTxDTO } from "./types";

export abstract class ICartRowCreateTx {
  abstract create(dto: CartRowCreateTxDTO): Promise<CartRelationEntity>;
}
