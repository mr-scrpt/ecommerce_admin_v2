import { OrderRowEntity } from "@/entities/order";
import {
  OrderRowRepository,
  orderRepository,
  orderRowRepository,
} from "@/entities/order/server";
import {
  ProductRepository,
  productRepository,
} from "@/entities/product/server";
import { DbClient, Transaction, Tx, dbClient } from "@/shared/lib/db";
import { OrderRowChangeQuantityComplexible } from "../_domain/types";

export class OrderRowChangeQuantityTx extends Transaction {
  constructor(
    readonly db: DbClient,
    private readonly orderRowRepo: OrderRowRepository,
    private readonly productRepo: ProductRepository,
  ) {
    super(dbClient);
  }

  async exec(data: OrderRowChangeQuantityComplexible): Promise<OrderRowEntity> {
    const action = async (tx: Tx) => {
      const { productId, orderRowId, quantity } = data;
      const product = await this.productRepo.getProduct(productId, tx);
      if (product.inStock < quantity) {
        throw new Error("Not enough products in stock");
      }
      await this.orderRowRepo.changeQuantity(
        {
          id: orderRowId,
          quantity,
        },
        tx,
      );

      return await this.orderRowRepo.getOrderRow(orderRowId, tx);
    };

    return await this.start(action);
  }
}

export const orderRowChangeQuantityTx = new OrderRowChangeQuantityTx(
  dbClient,
  orderRowRepository,
  productRepository,
);
