import { IDeliveryRepository } from "@/kernel/domain/delivery/repository.type";
import { injectable } from "inversify";
import {
  DeliveryGetByOrderSelector,
  DeliveryRelation,
  DeliveryRelationEntity,
} from "../_domain/delivery.types";

@injectable()
export class DeliveryWithRelationGetByOrderService {
  constructor(private readonly deliveryRepo: IDeliveryRepository) {}

  async execute(
    selector: DeliveryGetByOrderSelector,
  ): Promise<DeliveryRelation> {
    const res =
      await this.deliveryRepo.getWithRelationsByOrder<DeliveryRelationEntity>(
        selector,
      );
    return res;
  }
}
