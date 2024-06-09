import { DBClient, Transaction } from "@/shared/lib/db/db";
import { CartRowRemoveTxDTO } from "./types";
import { CartRelationEntity } from "@/entities/cart";

export abstract class ICartRowRemoveTx extends Transaction {
  constructor(readonly db: DBClient) {
    super(db);
  }

  abstract remove(dto: CartRowRemoveTxDTO): Promise<CartRelationEntity>;
}
