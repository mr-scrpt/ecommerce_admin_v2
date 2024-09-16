import { OrderStatusPayment } from "@/kernel/domain/order/orderStatus.type";
import { IOrderStatusRepository } from "@/kernel/domain/order/repository.type";
import { injectable } from "inversify";

@injectable()
export class OrderStatusPaymentListGetService {
  constructor(private readonly orderStatusRepo: IOrderStatusRepository) {}

  async execute(): Promise<Array<OrderStatusPayment>> {
    const orderStatusPaymentList =
      await this.orderStatusRepo.getStatusPaymentList();

    return orderStatusPaymentList;
  }
}
