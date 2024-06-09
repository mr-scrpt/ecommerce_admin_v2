import { CART_PRODUCT_QUANTITY_DEFAULT, CartRelation } from "@/entities/cart";
import { injectable } from "inversify";
import { ICartRowCreateTx } from "../_domain/transaction.type";
import { CartRowCreateTxDTO, CartRowCreateTxPayload } from "../_domain/types";

@injectable()
export class CartRowCreateService {
  constructor(private readonly cartRowUpdateTx: ICartRowCreateTx) {}

  async execute(payload: CartRowCreateTxPayload): Promise<CartRelation> {
    const cartRowCreateDTO = this.build(payload);
    return await this.cartRowUpdateTx.create(cartRowCreateDTO);
  }

  private build(payload: CartRowCreateTxPayload): CartRowCreateTxDTO {
    const { cartRowData, sessionData } = payload;
    const { user } = sessionData;
    return {
      cartRowData: {
        ...cartRowData,
        cartId: user.cartId,
        quantity: CART_PRODUCT_QUANTITY_DEFAULT,
      },
    };
  }
}
