import { CartRelation } from "@/entities/cart";
import { injectable } from "inversify";
import { CartRowAddTxPayload } from "../_domain/types";
import { CartRowAddTx } from "../_tx/cartRowAdd.transaction";

@injectable()
export class CartRowAddService {
  constructor(private readonly cartRowUpdateTx: CartRowAddTx) {}

  async execute(payload: CartRowAddTxPayload): Promise<CartRelation> {
    return await this.cartRowUpdateTx.add(payload);
  }
}
