import { injectable } from "inversify";
import { Delivery, DeliveryGetSelector } from "../_domain/delivery.types";
import { DeliveryRepository } from "../_repository/delivery.repo";

@injectable()
export class DeliveryGetService {
  constructor(private readonly deliveryRepo: DeliveryRepository) {}

  async execute(selector: DeliveryGetSelector): Promise<Delivery> {
    return await this.deliveryRepo.getDelivery(selector);
  }
}
