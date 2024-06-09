import { CartRelationEntity } from "@/entities/cart";
import { CartRowRemoveTxDTO } from "./types";

export abstract class ICartRowRemoveTx {
  abstract remove(dto: CartRowRemoveTxDTO): Promise<CartRelationEntity>;
}
