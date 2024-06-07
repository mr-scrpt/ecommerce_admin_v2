import { injectable } from "inversify";
import { Delivery } from "../_domain/delivery.types";
import { DeliveryRepository } from "../_repository/delivery.repo";

@injectable()
export class DeliveryListGetService {
  constructor(private readonly deliveryRepo: DeliveryRepository) {}

  async execute(): Promise<Array<Delivery>> {
    return await this.deliveryRepo.getDeliveryList();
  }
}
