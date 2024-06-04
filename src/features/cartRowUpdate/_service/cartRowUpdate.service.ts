import { CartRelation } from "@/entities/cart";
import { injectable } from "inversify";
import { CartRowUpdateTx } from "../_tx/cartRowUpdate.transaction";
import { CartRowUpdateTxPayload } from "../_domain/types";

@injectable()
export class CartRowUpdateService {
  constructor(private readonly cartRowUpdateTx: CartRowUpdateTx) {}

  async execute(payload: CartRowUpdateTxPayload): Promise<CartRelation> {
    return await this.cartRowUpdateTx.update(payload);
  }
}
