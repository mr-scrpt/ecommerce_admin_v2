import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { IOrderRowRemoveTx } from "../_domain/transaction.type";
import { OrderRowRemoveTxDTO } from "../_domain/types";
import {
  IOrderRepository,
  IOrderRowRepository,
} from "@/kernel/domain/order/repository.type";
import { OrderEntity } from "@/kernel/domain/order/order.type";
import { OrderRowRelation } from "@/entities/order/_domain/orderRow/orderRow.types";

@injectable()
export class OrderRowRemoveTx extends Transaction implements IOrderRowRemoveTx {
  constructor(
    readonly db: DBClient,
    private readonly orderRowRepo: IOrderRowRepository,
    private readonly orderRepo: IOrderRepository,
  ) {
    super(db);
  }

  async remove(dto: OrderRowRemoveTxDTO): Promise<OrderEntity> {
    const action = async (tx: Tx) => {
      const { selector } = dto;
      const { orderId } = await this.orderRowRepo.remove({ selector }, tx);

      const orderRowList = await this.orderRowRepo.getListWithRelationByOrder<
        Array<OrderRowRelation>
      >({ orderId }, tx);

      const priceTotal = orderRowList.reduce(
        (acc, row) => acc + row.product.price * row.quantity,
        0,
      );

      await this.orderRepo.update(
        { selector: { id: orderId }, data: { priceTotal } },
        tx,
      );

      const order = await this.orderRepo.get({ id: orderId }, tx);

      return order;
    };

    return await this.start(action);
  }
}
