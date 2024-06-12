import { injectable } from "inversify";
import {
  Delivery,
  DeliveryGetByOrderSelector,
} from "../_domain/delivery.types";
import { IDeliveryRepository } from "../_domain/repository.type";

@injectable()
export class DeliveryGetByOrderService {
  constructor(private readonly deliveryRepo: IDeliveryRepository) {}

  async execute(selector: DeliveryGetByOrderSelector): Promise<Delivery> {
    return await this.deliveryRepo.getByOrder(selector);
  }
}
