import { injectable } from "inversify";
import { Delivery } from "../_domain/delivery.types";
import { IDeliveryRepository } from "../_domain/repository.type";

@injectable()
export class DeliveryListGetService {
  constructor(private readonly deliveryRepo: IDeliveryRepository) {}

  async execute(): Promise<Array<Delivery>> {
    return await this.deliveryRepo.getList();
  }
}
