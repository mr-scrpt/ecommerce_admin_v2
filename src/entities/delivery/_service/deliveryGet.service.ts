import { injectable } from "inversify";
import { Delivery, DeliveryGetSelector } from "../_domain/delivery.types";
import { IDeliveryRepository } from "../_domain/repository.type";

@injectable()
export class DeliveryGetService {
  constructor(private readonly deliveryRepo: IDeliveryRepository) {}

  async execute(selector: DeliveryGetSelector): Promise<Delivery> {
    return await this.deliveryRepo.get(selector);
  }
}
