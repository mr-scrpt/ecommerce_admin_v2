import { CartRelation } from "@/entities/cart";
import { injectable } from "inversify";
import { ICartRowRemoveTx } from "../_domain/transaction.type";
import { CartRowRemoveTxPayload } from "../_domain/types";

@injectable()
export class CartRowRemoveService {
  constructor(private readonly cartRowRemoveTx: ICartRowRemoveTx) {}

  async execute(payload: CartRowRemoveTxPayload): Promise<CartRelation> {
    return await this.cartRowRemoveTx.remove(payload);
  }
}
