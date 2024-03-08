import { CartEntity } from "@/entities/cart";
import {
  CartRepository,
  CartRowRepository,
  cartRepository,
  cartRowRepository,
} from "@/entities/cart/server";
import { DbClient, Transaction, Tx, dbClient } from "@/shared/lib/db";
import { CartRowAddProductTxData } from "../_domain/types";

interface Operations {
  [key: string]: () => Promise<void>;
}

export class CartRowAddProductTx extends Transaction {
  constructor(
    readonly db: DbClient,
    private readonly cartRepo: CartRepository,
    private readonly cartRowRepo: CartRowRepository,
  ) {
    super(dbClient);
  }

  async addCartRowProductComplexible(
    data: CartRowAddProductTxData,
  ): Promise<CartEntity> {
    const { userId, productId, quantity } = data;
    const action = async (tx: Tx) => {
      console.log("output_log: 1) productId =>>>", productId);

      const cart = await this.cartRepo.getCartWithRelationByUserId(userId, tx);

      console.log("output_log: 2) cart =>>>", cart);
      const cartRowExisting = await this.cartRowRepo.getCartRowByProductId({
        cartId: cart.id,
        productId,
      });
      console.log("output_log:  3) cartRowExisting =>>>", cartRowExisting);

      const operations: Operations = {
        true: async () => {
          await this.cartRowRepo.increaseQuantity(
            {
              id: cartRowExisting.id,
              quantity,
            },
            tx,
          );
        },
        false: async () => {
          await this.cartRowRepo.addCartRowProduct(
            {
              cartId: cart.id,
              productId,
              quantity,
            },
            tx,
          );
        },
      };
      operations[String(!!cartRowExisting)]();

      return await this.cartRepo.getCartWithRelation(cart.id, tx);
    };

    return await this.start(action);
  }
}

export const cartRowAddProductTx = new CartRowAddProductTx(
  dbClient,
  cartRepository,
  cartRowRepository,
);
