import { CartEntity } from "@/entities/cart";
import {
  CartRepository,
  CartRowRepository,
  cartRepository,
  cartRowRepository,
} from "@/entities/cart/server";
import { DbClient, Transaction, Tx, dbClient } from "@/shared/lib/db";
import { CartRowRemoveProductTxData } from "../_domain/types";

interface Operations {
  [key: string]: () => Promise<void>;
}

export class CartRowRemoveProductTx extends Transaction {
  constructor(
    readonly db: DbClient,
    private readonly cartRepo: CartRepository,
    private readonly cartRowRepo: CartRowRepository,
  ) {
    super(dbClient);
  }

  async removeCartRowProductComplexible(
    data: CartRowRemoveProductTxData,
  ): Promise<CartEntity> {
    const { userId, productId } = data;
    const action = async (tx: Tx) => {
      // console.log("output_log: 1) productId =>>>", productId);

      const cart = await this.cartRepo.getCartWithRelationByUserId(userId, tx);

      // console.log("output_log: 2) cart =>>>", cart);

      const cartRowExisting = await this.cartRowRepo.getCartRowByProductId({
        cartId: cart.id,
        productId,
      });

      if (!cartRowExisting) {
        console.log("output_log: escalate error =>>>", cartRowExisting);
        throw new Error("Product not in cart");
      }

      await this.cartRowRepo.removeCartRowProduct(
        {
          cartId: cart.id,
          productId,
        },
        tx,
      );

      return await this.cartRepo.getCartWithRelation(cart.id, tx);
      // console.log("output_log:  3) cartRowExisting =>>>", cartRowExisting);

      // const operations: Operations = {
      //   true: async () => {
      //     await this.cartRowRepo.decreaseQuantity(
      //       {
      //         id: cartRowExisting!.id,
      //         quantity,
      //       },
      //       tx,
      //     );
      //   },
      //   false: async () => {
      //     await this.cartRowRepo.removeCartRowProduct(
      //       {
      //         cartId: cart.id,
      //         productId,
      //       },
      //       tx,
      //     );
      //   },
      // };
      // operations[String(!!cartRowExisting)]();
      //
      return await this.cartRepo.getCartWithRelation(cart.id, tx);
    };

    return await this.start(action);
  }
}

export const cartRowRemoveProductTx = new CartRowRemoveProductTx(
  dbClient,
  cartRepository,
  cartRowRepository,
);
