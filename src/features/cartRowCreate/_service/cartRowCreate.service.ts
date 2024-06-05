import { CartRelation } from "@/entities/cart";
import { injectable } from "inversify";
import { CartRowCreateTxPayload } from "../_domain/types";
import { CartRowCreateTx } from "../_tx/cartRowCreate.transaction";

@injectable()
export class CartRowCreateService {
  constructor(private readonly cartRowUpdateTx: CartRowCreateTx) {}

  async execute(payload: CartRowCreateTxPayload): Promise<CartRelation> {
    return await this.cartRowUpdateTx.create(payload);
  }
}
