import { CartRelationEntity } from "@/entities/cart";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { CartRowCreateTxDTO } from "../_domain/types";
import { ICartRowCreateTx } from "../_domain/transaction.type";
import {
  ICartRepository,
  ICartRowRepository,
} from "@/kernel/domain/cart/repository.type";

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
    const { cartRowData, target } = dto;
    const { productId } = cartRowData;
    const { cartId } = target;

    const action = async (tx: Tx): Promise<CartRelationEntity> => {
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
          target,
          data: cartRowData,
        },
        tx,
      );

      return await this.cartRepo.getRelation({ id: cartId }, tx);
    };

    return await this.start(action);
  }
}
