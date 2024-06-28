import { injectable } from "inversify";
import { IDeliveryRepository } from "@/kernel/domain/delivery/repository.type";
import { Delivery } from "@/kernel/domain/delivery/delivery.type";

@injectable()
export class DeliveryListGetService {
  constructor(private readonly deliveryRepo: IDeliveryRepository) {}

  async execute(): Promise<Array<Delivery>> {
    return await this.deliveryRepo.getList();
  }
}
