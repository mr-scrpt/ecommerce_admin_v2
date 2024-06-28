import { injectable } from "inversify";
import { DeliveryGetByOrderSelector } from "../_domain/delivery.types";
import { IDeliveryRepository } from "@/kernel/domain/delivery/repository.type";
import { Delivery } from "@/kernel/domain/delivery/delivery.type";

@injectable()
export class DeliveryGetByOrderService {
  constructor(private readonly deliveryRepo: IDeliveryRepository) {}

  async execute(selector: DeliveryGetByOrderSelector): Promise<Delivery> {
    return await this.deliveryRepo.getByOrder(selector);
  }
}
