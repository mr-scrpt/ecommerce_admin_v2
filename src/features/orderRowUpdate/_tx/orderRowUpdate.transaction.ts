import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { IOrderRowUpdateTx } from "../_domain/transaction.type";
import { OrderRowUpdateTxDTO } from "../_domain/types";
import {
  IOrderRepository,
  IOrderRowRepository,
} from "@/kernel/domain/order/repository.type";
import { OrderEntity } from "@/kernel/domain/order/order.type";
import { IProductRepository } from "@/kernel/domain/product/repository.type";

@injectable()
export class OrderRowUpdateTx extends Transaction implements IOrderRowUpdateTx {
  constructor(
    readonly db: DBClient,
    private readonly orderRowRepo: IOrderRowRepository,
    private readonly orderRepo: IOrderRepository,
    private readonly productRepo: IProductRepository,
  ) {
    super(db);
  }

  async update(dto: OrderRowUpdateTxDTO): Promise<OrderEntity> {
    const action = async (tx: Tx) => {
      const { selector, orderRowData } = dto;
      const { quantity } = orderRowData;

      const { orderId, productId } = await this.orderRowRepo.get(selector, tx);

      const product = await this.productRepo.get({ id: productId }, tx);

      if (quantity && product.inStock < quantity) {
        throw new Error("Not enough products in stock");
      }

      if (quantity && quantity < 1) {
        throw new Error("Quantity must be greater than 0");
      }

      const { quantity: quantityUpdated } = await this.orderRowRepo.update(
        { selector, data: orderRowData },
        tx,
      );

      // const orderRow = await this.orderRowRepo.get(selector, tx);
      // const { orderId } = orderRow;

      const order = await this.orderRepo.get({ id: orderId }, tx);

      const totalPrice = order.priceTotal + product.price * quantityUpdated;

      await this.orderRepo.update(
        { selector: { id: orderId }, data: { priceTotal: totalPrice } },
        tx,
      );

      const orderUpdated = await this.orderRepo.get({ id: orderId }, tx);
      return orderUpdated;
    };

    return await this.start(action);
  }
}
