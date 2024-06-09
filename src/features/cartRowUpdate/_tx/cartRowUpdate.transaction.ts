import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { CartRowUpdateTxDTO } from "../_domain/types";
import { CartRelationEntity } from "@/entities/cart";
import { ICartRepository, ICartRowRepository } from "@/entities/cart/server";
import { ICartRowUpdateTx } from "../_domain/transaction.type";

@injectable()
export class CartRowUpdateTx extends Transaction implements ICartRowUpdateTx {
  constructor(
    readonly db: DBClient,
    private readonly cartRepo: ICartRepository,
    private readonly cartRowRepo: ICartRowRepository,
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
