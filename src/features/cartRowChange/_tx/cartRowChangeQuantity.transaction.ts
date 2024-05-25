import { CartEntity } from "@/entities/cart";
import { CartRepository, CartRowRepository } from "@/entities/cart/server";
import { DBClient, Transaction, Tx, dbClient } from "@/shared/lib/db/db";
import { CartRowChangeQuantityTxData } from "../_domain/types";
import { injectable } from "inversify";

@injectable()
export class CartRowChangeQuantityTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly cartRepo: CartRepository,
    private readonly cartRowRepo: CartRowRepository,
  ) {
    super(dbClient);
  }

  async changeQuantityCartRowComplexible(
    data: CartRowChangeQuantityTxData,
  ): Promise<CartEntity> {
    const { userId, productId, quantity } = data;
    const action = async (tx: Tx) => {
      const cart = await this.cartRepo.getCartWithRelationByUserId(userId, tx);

      const cartRowExisting = await this.cartRowRepo.getCartRowByProductId({
        cartId: cart.id,
        productId,
      });

      if (!cartRowExisting) {
        throw new Error("Product not in cart");
      }
      await this.cartRowRepo.changeCartRowProductQuantity(
        {
          id: cartRowExisting!.id,
          quantity,
        },
        tx,
      );

      return await this.cartRepo.getCartWithRelation(cart.id, tx);
    };

    return await this.start(action);
  }
}
