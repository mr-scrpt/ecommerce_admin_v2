import { DELIVERY_TYPE } from "@/kernel/domain/delivery/delivery.type";
import { ISettlementRepository } from "@/kernel/domain/settlement/repository.type";
import { IStoreRepository } from "@/kernel/domain/store/repository.type";
import { injectable } from "inversify";
import { deliveryMapToSettlement } from "../_domain/delivery.map";
import { DeliveryTypeListGetBySettlementRefSelector } from "../_domain/delivery.types";
import { IDeliveryTypeRepository } from "@/kernel/domain/delivery/repository.type";

@injectable()
export class DeliveryTypeAvailableListGetService {
  constructor(
    private readonly storeRepo: IStoreRepository,
    private readonly settlementRepo: ISettlementRepository,
    private readonly deliveryTypeRepo: IDeliveryTypeRepository,
  ) {}

  async execute(
    selector: DeliveryTypeListGetBySettlementRefSelector,
  ): Promise<any> {
    DELIVERY_TYPE;

    const deliveryTypeList = await this.deliveryTypeRepo.getList();

    const settlement = await this.settlementRepo.getByRef(selector);

    const storeList =
      await this.storeRepo.getListBySettlementRefWithRelation(selector);

    const settlementWithStoreList = deliveryMapToSettlement({
      deliveryTypeList,
      settlement: {
        ...settlement,
        storeList,
      },
    });

    console.log("output_log: AVAILABLE =>>>", settlementWithStoreList);
    return settlementWithStoreList;
  }
}
