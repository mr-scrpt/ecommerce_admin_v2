import { IDeliveryRepository } from "@/kernel/domain/delivery/repository.type";
import { injectable } from "inversify";
import {
  DeliveryGetByOrderSelector,
  DeliveryRelation,
  DeliveryRelationEntity,
} from "../_domain/delivery.types";
import { IPostRepository } from "@/kernel/domain/post/repository.type";

@injectable()
export class DeliveryWithRelationGetByOrderService {
  constructor(
    private readonly deliveryRepo: IDeliveryRepository,

    private readonly postRepo: IPostRepository,
  ) {}

  async execute(
    selector: DeliveryGetByOrderSelector,
  ): Promise<DeliveryRelation> {
    const delivery =
      await this.deliveryRepo.getWithRelationsByOrder<DeliveryRelationEntity>(
        selector,
      );

    const deliveryRespose: DeliveryRelation = {
      ...delivery,
      postOffice: null,
    };

    if (delivery.postOfficeId) {
      const postOffice = await this.postRepo.getPostOffice({
        id: delivery.postOfficeId,
      });

      deliveryRespose.postOffice = postOffice;
    }

    return deliveryRespose;
  }
}
