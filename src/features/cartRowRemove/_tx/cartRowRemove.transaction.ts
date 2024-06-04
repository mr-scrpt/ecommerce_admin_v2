import { CartRepository, CartRowRepository } from "@/entities/cart/server";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { CartRowRemoveTxDTO } from "../_domain/types";
import { CartRelationEntity } from "@/entities/cart";

@injectable()
export class CartRowRemoveTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly cartRepo: CartRepository,
    private readonly cartRowRepo: CartRowRepository,
  ) {
    super(db);
  }

  async remove(dto: CartRowRemoveTxDTO): Promise<CartRelationEntity> {
    const { cartData, cartRowData } = dto;
    const { productId } = cartRowData;
    const { cartId } = cartData;

    const action = async (tx: Tx) => {
      const cart = await this.cartRepo.getCart({ id: cartId }, tx);

      const cartRowExisting = await this.cartRowRepo.getCartRowByProductId({
        cartId: cart.id,
        productId,
      });

      if (!cartRowExisting) {
        throw new Error("Product not in cart");
      }

      await this.cartRowRepo.removeCartRowProduct(
        {
          cartId: cart.id,
          productId,
        },
        tx,
      );

      return await this.cartRepo.getCartRelation({ id: cartId }, tx);
    };

    return await this.start(action);
  }
}
