import { OrderRowEntity } from "@/entities/order";
import { OrderRepository, OrderRowRepository } from "@/entities/order/server";
import { ProductRepository } from "@/entities/product/server";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { OrderRowUpdateQuantityComplexible } from "../_domain/types";
import { injectable } from "inversify";

@injectable()
export class OrderRowUpdateQuantityTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly orderRowRepo: OrderRowRepository,
    private readonly orderRepo: OrderRepository,
    private readonly productRepo: ProductRepository,
  ) {
    super(db);
  }

  async exec(data: OrderRowUpdateQuantityComplexible): Promise<OrderRowEntity> {
    const action = async (tx: Tx) => {
      const { productId, orderRowId, quantity } = data;
      const product = await this.productRepo.get(productId, tx);

      if (product.inStock < quantity) {
        throw new Error("Not enough products in stock");
      }

      await this.orderRowRepo.updateQuantity(
        {
          orderRowId,
          quantity,
        },
        tx,
      );

      const orderRow = await this.orderRowRepo.get(orderRowId, tx);
      const { orderId } = orderRow;

      const order = await this.orderRepo.getOrder(orderId, tx);
      const totalPrice = order.priceTotal + product.price * quantity;

      await this.orderRepo.updateTotalPrice(orderId, totalPrice, tx);
      return orderRow;
    };

    return await this.start(action);
  }
}
