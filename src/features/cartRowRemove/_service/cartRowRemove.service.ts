import { CartRelation } from "@/entities/cart";
import { injectable } from "inversify";
import { CartRowRemoveTxPayload } from "../_domain/types";
import { CartRowRemoveTx } from "../_tx/cartRowRemove.transaction";

@injectable()
export class CartRowRemoveService {
  constructor(private readonly cartRowRemoveTx: CartRowRemoveTx) {}

  async execute(payload: CartRowRemoveTxPayload): Promise<CartRelation> {
    return await this.cartRowRemoveTx.remove(payload);
  }
}
