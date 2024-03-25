import { OrderRowEntity } from "@/entities/order";
import {
  OrderRowRepository,
  orderRowRepository,
} from "@/entities/order/server";
import {
  ProductRepository,
  productRepository,
} from "@/entities/product/server";
import { DbClient, Transaction, Tx, dbClient } from "@/shared/lib/db";
import { OrderRowUpdateQuantityComplexible } from "../_domain/types";

export class OrderRowUpdateQuantityTx extends Transaction {
  constructor(
    readonly db: DbClient,
    private readonly orderRowRepo: OrderRowRepository,
    private readonly productRepo: ProductRepository,
  ) {
    super(dbClient);
  }

  async exec(data: OrderRowUpdateQuantityComplexible): Promise<OrderRowEntity> {
    const action = async (tx: Tx) => {
      const { productId, orderRowId, quantity } = data;
      const product = await this.productRepo.getProduct(productId, tx);

      if (product.inStock < quantity) {
        throw new Error("Not enough products in stock");
      }

      await this.orderRowRepo.updateQuantityRow(
        {
          orderRowId,
          quantity,
        },
        tx,
      );

      return await this.orderRowRepo.getOrderRow(orderRowId, tx);
    };

    return await this.start(action);
  }
}

export const orderRowUpdateQuantityTx = new OrderRowUpdateQuantityTx(
  dbClient,
  orderRowRepository,
  productRepository,
);
