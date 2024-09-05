import { IDeliveryTypeRepository } from "@/kernel/domain/delivery/repository.type";
import { ISettlementRepository } from "@/kernel/domain/settlement/repository.type";
import { IStoreRepository } from "@/kernel/domain/store/repository.type";
import { DeliveryType } from "@prisma/client";
import { injectable } from "inversify";
import { deliveryMapToSettlement } from "../_domain/delivery.map";
import { DeliveryTypeListGetBySettlementRefSelector } from "../_domain/delivery.types";

@injectable()
export class DeliveryTypeAvailableListGetService {
  constructor(
    private readonly storeRepo: IStoreRepository,
    private readonly settlementRepo: ISettlementRepository,
    private readonly deliveryTypeRepo: IDeliveryTypeRepository,
  ) {}

  async execute(
    selector: DeliveryTypeListGetBySettlementRefSelector,
  ): Promise<Array<DeliveryType>> {
    const deliveryTypeList = await this.deliveryTypeRepo.getList();

    if (!selector.settlementRef) {
      return deliveryTypeList;
    }
    const { settlementRef } = selector;

    const settlement = await this.settlementRepo.getByRef({ settlementRef });

    const storeList = await this.storeRepo.getListBySettlementRefWithRelation({
      settlementRef,
    });

    const settlementWithStoreList = deliveryMapToSettlement({
      deliveryTypeList,
      settlement: {
        ...settlement,
        storeList,
      },
    });

    return settlementWithStoreList;
  }
}
