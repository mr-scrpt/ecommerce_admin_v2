import { CartEntity } from "@/entities/cart";
import { CartRepository, CartRowRepository } from "@/entities/cart/server";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { CartRowRemoveProductTxData } from "../_domain/types";

export class CartRowRemoveProductTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly cartRepo: CartRepository,
    private readonly cartRowRepo: CartRowRepository,
  ) {
    super(db);
  }

  async removeCartRowProductComplexible(
    data: CartRowRemoveProductTxData,
  ): Promise<CartEntity> {
    const { userId, productId } = data;
    const action = async (tx: Tx) => {
      const cart = await this.cartRepo.getCartWithRelationByUser(userId, tx);

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

      return await this.cartRepo.getCartRelation(cart.id, tx);
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
      return await this.cartRepo.getCartRelation(cart.id, tx);
    };

    return await this.start(action);
  }
}
