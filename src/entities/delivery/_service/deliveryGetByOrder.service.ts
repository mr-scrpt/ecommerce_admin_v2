import { injectable } from "inversify";
import {
  Delivery,
  DeliveryGetByOrderSelector,
} from "../_domain/delivery.types";
import { DeliveryRepository } from "../_repository/delivery.repo";

@injectable()
export class DeliveryGetByOrderService {
  constructor(private readonly deliveryRepo: DeliveryRepository) {}

  async execute(payload: DeliveryGetByOrderSelector): Promise<Delivery> {
    return await this.deliveryRepo.getDeliveryByOrder(payload);
  }
}
