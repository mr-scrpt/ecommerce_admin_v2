import { CartEntity } from "@/entities/cart";
import { CartRepository, CartRowRepository } from "@/entities/cart/server";
import { DBClient, Transaction, Tx, dbClient } from "@/shared/lib/db";
import { CartRowAddTxData } from "../_domain/types";
import { injectable } from "inversify";

@injectable()
export class CartRowAddTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly cartRepo: CartRepository,
    private readonly cartRowRepo: CartRowRepository,
  ) {
    super(dbClient);
  }

  async addCartRowProductComplexible(
    data: CartRowAddTxData,
  ): Promise<CartEntity> {
    const { userId, productId } = data;
    const action = async (tx: Tx) => {
      const cart = await this.cartRepo.getCartWithRelationByUserId(userId, tx);

      const cartRowExisting = await this.cartRowRepo.getCartRowByProductId({
        cartId: cart.id,
        productId,
      });

      if (cartRowExisting) {
        throw new Error("Product already in cart");
      }
      await this.cartRowRepo.addCartRowProduct(
        {
          cartId: cart.id,
          productId,
        },
        tx,
      );

      return await this.cartRepo.getCartWithRelation(cart.id, tx);
    };

    return await this.start(action);
  }
}
