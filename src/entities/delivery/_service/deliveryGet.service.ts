import { injectable } from "inversify";
import { DeliveryGetSelector } from "../_domain/delivery.types";
import { IDeliveryRepository } from "@/kernel/domain/delivery/repository.type";
import { Delivery } from "@/kernel/domain/delivery/delivery.type";

@injectable()
export class DeliveryGetService {
  constructor(private readonly deliveryRepo: IDeliveryRepository) {}

  async execute(selector: DeliveryGetSelector): Promise<Delivery> {
    return await this.deliveryRepo.get(selector);
  }
}
