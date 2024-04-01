import {
  OrderRepository,
  OrderRowRepository,
  orderRepository,
  orderRowRepository,
} from "@/entities/order/server";
import { DbClient, Transaction, Tx, dbClient } from "@/shared/lib/db";
import { OrderEntity } from "@/entities/order";
import { OrderRowAddComplexible } from "../_domain/types";
import {
  ProductRepository,
  productRepository,
} from "@/entities/product/server";

export class OrderRowAddTx extends Transaction {
  constructor(
    readonly db: DbClient,
    private readonly orderRowRepo: OrderRowRepository,
    private readonly orderRepo: OrderRepository,
    private readonly productRepo: ProductRepository,
  ) {
    super(dbClient);
  }

  async exec(data: OrderRowAddComplexible): Promise<OrderEntity> {
    const action = async (tx: Tx) => {
      const { productId, orderId, quantity } = data;
      const product = await this.productRepo.getProduct(productId, tx);
      await this.orderRowRepo.createOrderRow(
        {
          orderId,

          productId,
          productName: product.name,
          productArticle: product.article,
          productImg: product.img[0],
          quantity,
          price: product.price,
        },
        tx,
      );

      const order = await this.orderRepo.getOrder(orderId, tx);
      const totalPrice = order.priceTotal + product.price * quantity;
      const updatedOrder = await this.orderRepo.updateTotalPrice(
        orderId,
        totalPrice,
        tx,
      );

      return updatedOrder;
    };

    return await this.start(action);
  }
}

export const orderRowAddTx = new OrderRowAddTx(
  dbClient,
  orderRowRepository,
  orderRepository,
  productRepository,
);
