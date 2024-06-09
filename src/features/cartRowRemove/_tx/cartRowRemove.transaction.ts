import { CartRelationEntity } from "@/entities/cart";
import { ICartRepository, ICartRowRepository } from "@/entities/cart/server";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { ICartRowRemoveTx } from "../_domain/transaction.type";
import { CartRowRemoveTxDTO } from "../_domain/types";

@injectable()
export class CartRowRemoveTx extends Transaction implements ICartRowRemoveTx {
  constructor(
    readonly db: DBClient,
    private readonly cartRepo: ICartRepository,
    private readonly cartRowRepo: ICartRowRepository,
  ) {
    super(db);
  }

  async remove(dto: CartRowRemoveTxDTO): Promise<CartRelationEntity> {
    const { selector } = dto;
    const { productId, cartId } = selector;

    const action = async (tx: Tx) => {
      const cartRowExisting = await this.cartRowRepo.getCartRowByProduct({
        cartId,
        productId,
      });

      if (!cartRowExisting) {
        throw new Error("Product not in cart");
      }

      await this.cartRowRepo.removeCartRow(
        {
          selector: {
            id: cartRowExisting.id,
          },
        },
        tx,
      );

      return await this.cartRepo.getCartRelation({ id: cartId }, tx);
    };

    return await this.start(action);
  }
}
