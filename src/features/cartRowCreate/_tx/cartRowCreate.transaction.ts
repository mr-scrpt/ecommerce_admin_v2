import { CartRelationEntity } from "@/entities/cart";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { CartRowCreateTxDTO } from "../_domain/types";
import { ICartRepository, ICartRowRepository } from "@/entities/cart/server";
import { ICartRowCreateTx } from "../_domain/transaction.type";

@injectable()
export class CartRowCreateTx extends Transaction implements ICartRowCreateTx {
  constructor(
    readonly db: DBClient,
    private readonly cartRepo: ICartRepository,
    private readonly cartRowRepo: ICartRowRepository,
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
          data: cartRowData,
        },
        tx,
      );

      return await this.cartRepo.getCartRelation({ id: cartId }, tx);
    };

    return await this.start(action);
  }
}
