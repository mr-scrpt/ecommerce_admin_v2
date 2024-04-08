import { OrderEntity } from "@/entities/order";
import { OrderRepository, OrderRowRepository } from "@/entities/order/server";
import { ProductRepository } from "@/entities/product/server";
import { DBClient, Transaction, Tx, dbClient } from "@/shared/lib/db";
import { OrderCreateComplexible } from "../_domain/types";
import { injectable } from "inversify";

@injectable()
export class OrderCreateTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly orderRepo: OrderRepository,
    private readonly orderRowRepo: OrderRowRepository,
    private readonly productRepo: ProductRepository,
  ) {
    super(dbClient);
  }

  async exec(data: OrderCreateComplexible): Promise<OrderEntity> {
    const action = async (tx: Tx) => {
      const { userId, orderStatus, orderRowData, paymentStatus } = data;
      const productListId = orderRowData.map((item) => item.productId);

      const priceTotal = await this.productRepo.getTotalPrice(
        productListId,
        tx,
      );

      const { id } = await this.orderRepo.createOrder(
        {
          userId,
          orderStatus,
          paymentStatus,
          priceTotal,
        },
        tx,
      );

      for await (const item of orderRowData) {
        const { productId, quantity } = item;
        const product = await this.productRepo.getProduct(productId, tx);
        await this.orderRowRepo.createOrderRow(
          {
            orderId: id,

            productId,
            productName: product.name,
            productArticle: product.article,
            productImg: product.img[0],
            quantity,
            price: product.price,
          },
          tx,
        );
      }

      return await this.orderRepo.getOrder(id, tx);
    };

    return await this.start(action);
  }
}
