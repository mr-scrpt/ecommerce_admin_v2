import { DeliveryType } from "@/kernel/domain/delivery/deliveryType.type";
import { IDeliveryTypeRepository } from "@/kernel/domain/delivery/repository.type";
import { injectable } from "inversify";

@injectable()
export class DeliveryTypeListGetService {
  constructor(private readonly deliveryTypeRepo: IDeliveryTypeRepository) {}

  async execute(): Promise<Array<DeliveryType>> {
    const deliveryList = await this.deliveryTypeRepo.getList();
    return deliveryList;
  }
}
