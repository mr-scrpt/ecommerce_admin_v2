import { DBClient, Transaction } from "@/shared/lib/db/db";
import { CartRowCreateTxDTO } from "./types";
import { CartRelationEntity } from "@/entities/cart";

export abstract class ICartRowCreateTx extends Transaction {
  constructor(readonly db: DBClient) {
    super(db);
  }

  abstract create(dto: CartRowCreateTxDTO): Promise<CartRelationEntity>;
}
