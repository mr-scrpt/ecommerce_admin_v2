import { OrderEntity } from "@/entities/order";
import { IOrderRepository, IOrderRowRepository } from "@/entities/order/server";
import { IProductRepository } from "@/entities/product/server";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { OrderRowCreateTxDTO } from "../_domain/types";
import { IOrderRowCreateTx } from "../_domain/transaction.type";

@injectable()
export class OrderRowCreateTx extends Transaction implements IOrderRowCreateTx {
  constructor(
    readonly db: DBClient,
    private readonly orderRowRepo: IOrderRowRepository,
    private readonly orderRepo: IOrderRepository,
    private readonly productRepo: IProductRepository,
  ) {
    super(db);
  }

  async create(dto: OrderRowCreateTxDTO): Promise<OrderEntity> {
    const action = async (tx: Tx) => {
      const { orderRowData, target } = dto;
      const { productId, quantity } = orderRowData;
      const { orderId } = target;

      const orderRow = await this.orderRowRepo.getByOrderProduct({
        orderId,
        productId,
      });

      if (orderRow) {
        throw new Error("Product already in order");
      }

      const { name, article, price, img } = await this.productRepo.get(
        { id: productId },
        tx,
      );
      // TODO: invariant if product in order

      await this.orderRowRepo.create(
        {
          target,
          data: {
            ...orderRowData,
            productId,
            productName: name,
            price: price,
            productArticle: article,
            productImg: img[0],
          },
        },
        tx,
      );

      const order = await this.orderRepo.get({ id: orderId }, tx);
      const totalPrice = order.priceTotal + price * quantity;
      const updatedOrder = await this.orderRepo.update(
        {
          selector: { id: orderId },
          data: { priceTotal: totalPrice },
        },
        tx,
      );

      return updatedOrder;
    };

    return await this.start(action);
  }
}
