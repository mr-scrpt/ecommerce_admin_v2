import { CartEntity } from "@/entities/cart";
import { CartRepository, CartRowRepository } from "@/entities/cart/server";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { CartRowAddTxDTO } from "../_domain/types";
import { CartRelationEntity } from "@/entities/cart/_domain/types";

@injectable()
export class CartRowAddTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly cartRepo: CartRepository,
    private readonly cartRowRepo: CartRowRepository,
  ) {
    super(db);
  }

  async add(dto: CartRowAddTxDTO): Promise<CartRelationEntity> {
    const { cartRowData: productData, cartData } = dto;
    const { productId } = productData;
    const { cartId } = cartData;

    const action = async (tx: Tx) => {
      const cart = await this.cartRepo.getCartRelation({ id: cartId }, tx);

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

      return await this.cartRepo.getCartRelation({ id: cartId }, tx);
    };

    return await this.start(action);
  }
}
