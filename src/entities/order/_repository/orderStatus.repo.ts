import { OrderStatusGetDTO } from "@/kernel/domain/order/orderStatus.dto";
import {
  ORDER_STATUS_PAYMENT,
  ORDER_STATUS_STATE,
  OrderStatusPaymentEntity,
  OrderStatusStateEntity,
} from "@/kernel/domain/order/orderStatus.type";
import { IOrderStatusRepository } from "@/kernel/domain/order/repository.type";
import { DBClient, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";

@injectable()
export class OrderStatusRepository implements IOrderStatusRepository {
  constructor(readonly db: DBClient) {}

  async getStatusState(
    dto: OrderStatusGetDTO,
    db: Tx = this.db,
  ): Promise<OrderStatusStateEntity> {
    const orderStatusState = await db.orderStatusState.findUniqueOrThrow({
      where: dto,
    });

    return orderStatusState;
  }

  async getStatusPayment(
    dto: OrderStatusGetDTO,
    db: Tx = this.db,
  ): Promise<OrderStatusPaymentEntity> {
    const orderStatusPayment = await db.orderStatusPayment.findUniqueOrThrow({
      where: dto,
    });

    return orderStatusPayment;
  }

  async getStatusStateList(
    db: Tx = this.db,
  ): Promise<Array<OrderStatusStateEntity>> {
    const orderStatusState = await db.orderStatusState.findMany();
    return orderStatusState;
  }

  async getStatusPaymentList(
    db: Tx = this.db,
  ): Promise<Array<OrderStatusPaymentEntity>> {
    const orderStatusPayment = await db.orderStatusPayment.findMany();
    return orderStatusPayment;
  }

  async getStatusDefaultState(
    db: Tx = this.db,
  ): Promise<OrderStatusStateEntity> {
    const orderStatusState = await db.orderStatusState.findFirstOrThrow({
      where: {
        status: ORDER_STATUS_STATE.TEMP,
      },
    });
    return orderStatusState;
  }

  async getStatusDefaultPayment(
    db: Tx = this.db,
  ): Promise<OrderStatusPaymentEntity> {
    const orderStatusPayment = await db.orderStatusPayment.findFirstOrThrow({
      where: {
        status: ORDER_STATUS_PAYMENT.TEMP,
      },
    });
    return orderStatusPayment;
  }
}
