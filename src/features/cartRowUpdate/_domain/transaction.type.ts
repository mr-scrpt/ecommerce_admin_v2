import { CartRelationEntity } from "@/entities/cart";
import { CartRowUpdateTxDTO } from "../_domain/types";

export abstract class ICartRowUpdateTx {
  abstract update(dto: CartRowUpdateTxDTO): Promise<CartRelationEntity>;
}
