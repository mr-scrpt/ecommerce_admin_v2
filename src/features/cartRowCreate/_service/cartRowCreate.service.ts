import { CART_PRODUCT_QUANTITY_DEFAULT, CartRelation } from "@/entities/cart";
import { injectable } from "inversify";
import { ICartRowCreateTx } from "../_domain/transaction.type";
import { CartRowCreateTxDTO, CartRowCreateTxPayload } from "../_domain/types";

@injectable()
export class CartRowCreateService {
  constructor(private readonly cartRowCreateTx: ICartRowCreateTx) {}

  async execute(payload: CartRowCreateTxPayload): Promise<CartRelation> {
    const cartRowCreateDTO = this.build(payload);
    return await this.cartRowCreateTx.create(cartRowCreateDTO);
  }

  private build(payload: CartRowCreateTxPayload): CartRowCreateTxDTO {
    const { cartRowData, sessionData } = payload;
    const { user } = sessionData;
    return {
      target: {
        cartId: user.cartId,
      },
      cartRowData: {
        ...cartRowData,
        quantity: CART_PRODUCT_QUANTITY_DEFAULT,
      },
    };
  }
}
