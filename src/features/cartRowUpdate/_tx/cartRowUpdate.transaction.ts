import { CartRepository, CartRowRepository } from "@/entities/cart/server";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { CartRowUpdateTxDTO } from "../_domain/types";
import { CartRelationEntity } from "@/entities/cart";

@injectable()
export class CartRowUpdateTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly cartRepo: CartRepository,
    private readonly cartRowRepo: CartRowRepository,
  ) {
    super(db);
  }

  async update(dto: CartRowUpdateTxDTO): Promise<CartRelationEntity> {
    const { cartRowData, selector } = dto;
    const { quantity } = cartRowData;
    const { cartId, productId } = selector;
    const action = async (tx: Tx) => {
      const cartRowExisting = await this.cartRowRepo.getCartRowByProduct({
        cartId,
        productId,
      });

      if (!cartRowExisting) {
        throw new Error("Product not in cart");
      }
      await this.cartRowRepo.updateCartRow(
        {
          selector: {
            id: cartRowExisting!.id,
          },
          data: {
            quantity,
          },
        },
        tx,
      );

      return await this.cartRepo.getCartRelation({ id: cartId }, tx);
    };

    return await this.start(action);
  }
}
