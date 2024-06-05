import { CartRepository, CartRowRepository } from "@/entities/cart/server";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { CartRowCreateTxDTO } from "../_domain/types";
import { CartRelationEntity } from "@/entities/cart";

@injectable()
export class CartRowCreateTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly cartRepo: CartRepository,
    private readonly cartRowRepo: CartRowRepository,
  ) {
    super(db);
  }

  async create(dto: CartRowCreateTxDTO): Promise<CartRelationEntity> {
    const { cartRowData } = dto;
    const { productId, cartId } = cartRowData;

    const action = async (tx: Tx) => {
      const cartRowExisting = await this.cartRowRepo.getCartRowByProduct(
        {
          cartId,
          productId,
        },
        tx,
      );

      // TODO: Error handling
      if (cartRowExisting) {
        throw new Error("Product already in cart");
      }

      await this.cartRowRepo.createCartRow(
        {
          data: {
            cartId,
            productId,
            quantity: 1,
          },
        },
        tx,
      );

      return await this.cartRepo.getCartRelation({ id: cartId }, tx);
    };

    return await this.start(action);
  }
}
