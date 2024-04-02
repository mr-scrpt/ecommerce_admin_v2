import { OrderRowEntity } from "@/entities/order";
import {
  OrderRepository,
  OrderRowRepository,
  orderRepository,
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
    private readonly orderRepo: OrderRepository,
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

      const orderRow = await this.orderRowRepo.getOrderRow(orderRowId, tx);
      const { orderId } = orderRow;

      const order = await this.orderRepo.getOrder(orderId, tx);
      const totalPrice = order.priceTotal + product.price * quantity;

      await this.orderRepo.updateTotalPrice(orderId, totalPrice, tx);
      return orderRow;
    };

    return await this.start(action);
  }
}

export const orderRowUpdateQuantityTx = new OrderRowUpdateQuantityTx(
  dbClient,
  orderRowRepository,
  orderRepository,
  productRepository,
);
