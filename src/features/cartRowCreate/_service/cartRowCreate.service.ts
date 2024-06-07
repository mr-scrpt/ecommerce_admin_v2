import { CART_PRODUCT_QUANTITY_DEFAULT, CartRelation } from "@/entities/cart";
import { injectable } from "inversify";
import { CartRowCreateTxDTO, CartRowCreateTxPayload } from "../_domain/types";
import { CartRowCreateTx } from "../_tx/cartRowCreate.transaction";
import { merge } from "lodash";

@injectable()
export class CartRowCreateService {
  constructor(private readonly cartRowUpdateTx: CartRowCreateTx) {}

  async execute(payload: CartRowCreateTxPayload): Promise<CartRelation> {
    const cartRowCreateDTO = this.build(payload);
    return await this.cartRowUpdateTx.create(cartRowCreateDTO);
  }

  private build(payload: CartRowCreateTxPayload): CartRowCreateTxDTO {
    return merge({}, payload, {
      cartRowData: {
        ...payload.cartRowData,
        quantity: CART_PRODUCT_QUANTITY_DEFAULT,
      },
    });
  }
}
