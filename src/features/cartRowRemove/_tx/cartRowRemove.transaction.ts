import { CartRelationEntity } from "@/entities/cart";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { ICartRowRemoveTx } from "../_domain/transaction.type";
import { CartRowRemoveTxDTO } from "../_domain/types";
import {
  ICartRepository,
  ICartRowRepository,
} from "@/kernel/domain/cart/repository.type";

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

    const action = async (tx: Tx): Promise<CartRelationEntity> => {
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

      return await this.cartRepo.getRelation({ id: cartId }, tx);
    };

    return await this.start(action);
  }
}
