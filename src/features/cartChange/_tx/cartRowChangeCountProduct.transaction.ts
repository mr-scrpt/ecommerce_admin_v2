import { CartEntity } from "@/entities/cart";
import {
  CartRepository,
  CartRowRepository,
  cartRepository,
  cartRowRepository,
} from "@/entities/cart/server";
import { DbClient, Transaction, Tx, dbClient } from "@/shared/lib/db";
import { CartRowChangeCountProductTxData } from "../_domain/types";

interface Operations {
  [key: string]: () => Promise<void>;
}

export class CartRowChangeCountProductTx extends Transaction {
  constructor(
    readonly db: DbClient,
    private readonly cartRepo: CartRepository,
    private readonly cartRowRepo: CartRowRepository,
  ) {
    super(dbClient);
  }

  async changeCountCartRowProductComplexible(
    data: CartRowChangeCountProductTxData,
  ): Promise<CartEntity> {
    const { userId, productId, quantity } = data;
    const action = async (tx: Tx) => {
      const cart = await this.cartRepo.getCartWithRelationByUserId(userId, tx);

      const cartRowExisting = await this.cartRowRepo.getCartRowByProductId({
        cartId: cart.id,
        productId,
      });

      if (!cartRowExisting) {
        console.log("output_log: escalate error =>>>", cartRowExisting);
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

      // const operations: Operations = {
      //   true: async () => {
      //     await this.cartRowRepo.increaseQuantity(
      //       {
      //         id: cartRowExisting!.id,
      //         quantity,
      //       },
      //       tx,
      //     );
      //   },
      //   false: async () => {
      //     await this.cartRowRepo.changeCountCartRowProduct(
      //       {
      //         cartId: cart.id,
      //         productId,
      //         quantity,
      //       },
      //       tx,
      //     );
      //   },
      // };

      // operations[String(!!cartRowExisting)]();
    };

    return await this.start(action);
  }
}

export const cartRowChangeCountProductTx = new CartRowChangeCountProductTx(
  dbClient,
  cartRepository,
  cartRowRepository,
);
