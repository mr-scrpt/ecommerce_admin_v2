import { OrderStatusState } from "@/kernel/domain/order/orderStatus.type";
import { IOrderStatusRepository } from "@/kernel/domain/order/repository.type";
import { injectable } from "inversify";

@injectable()
export class OrderStatusStateListGetService {
  constructor(private readonly orderStatusRepo: IOrderStatusRepository) {}

  async execute(): Promise<Array<OrderStatusState>> {
    const orderStatusStateList =
      await this.orderStatusRepo.getStatusStateList();

    return orderStatusStateList;
  }
}
