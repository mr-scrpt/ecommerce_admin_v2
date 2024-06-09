import { CartRelationEntity } from "@/entities/cart";
import { DBClient, Transaction } from "@/shared/lib/db/db";
import { CartRowUpdateTxDTO } from "../_domain/types";

export abstract class ICartRowUpdateTx extends Transaction {
  constructor(readonly db: DBClient) {
    super(db);
  }

  abstract update(dto: CartRowUpdateTxDTO): Promise<CartRelationEntity>;
}
