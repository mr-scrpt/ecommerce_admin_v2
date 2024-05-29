import { injectable } from "inversify";
import { Delivery, DeliveryGetPayload } from "../_domain/delivery.types";
import { DeliveryRepository } from "../_repository/delivery.repo";

@injectable()
export class DeliveryGetService {
  constructor(private readonly deliveryRepo: DeliveryRepository) {}

  async execute(payload: DeliveryGetPayload): Promise<Delivery> {
    return await this.deliveryRepo.getDelivery(payload);
  }
}
