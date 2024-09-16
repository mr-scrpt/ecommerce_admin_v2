import { OrderStatusList } from "@/kernel/domain/order/orderStatus.type";
import { IOrderStatusRepository } from "@/kernel/domain/order/repository.type";
import { injectable } from "inversify";

@injectable()
export class OrderStatusAvailableGetService {
  constructor(private readonly orderStatusRepo: IOrderStatusRepository) {}

  async execute(): Promise<OrderStatusList> {
    const [orderStatusStateList, orderStatusPaymentList] = await Promise.all([
      await this.orderStatusRepo.getStatusStateList(),
      await this.orderStatusRepo.getStatusPaymentList(),
    ]);

    return {
      orderStatusStateList,
      orderStatusPaymentList,
    };
  }
}
