import { injectable } from "inversify";
import { Delivery, DeliveryGetOrderSelector } from "../_domain/delivery.types";
import { DeliveryRepository } from "../_repository/delivery.repo";

@injectable()
export class DeliveryGetOrderService {
  constructor(private readonly deliveryRepo: DeliveryRepository) {}

  async execute(payload: DeliveryGetOrderSelector): Promise<Delivery> {
    return await this.deliveryRepo.getDeliveryOrder(payload);
  }
}
