import { CartRelationEntity } from "@/entities/cart";
import { CartRowCreateTxDTO } from "./types";
import { Transaction } from "@/shared/lib/db/db";

export abstract class ICartRowCreateTx extends Transaction {
  abstract create(dto: CartRowCreateTxDTO): Promise<CartRelationEntity>;
}
