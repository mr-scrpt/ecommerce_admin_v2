import { DELIVERY_TYPE } from "@/kernel/domain/delivery/delivery.type";
import { IPostRepository } from "@/kernel/domain/post/repository.type";
import { ISettlementRepository } from "@/kernel/domain/settlement/repository.type";
import { IStoreRepository } from "@/kernel/domain/store/repository.type";
import { injectable } from "inversify";
import { DeliveryTypeListGetBySettlementRefSelector } from "../_domain/delivery.types";

@injectable()
export class DeliveryTypeListGetService {
  constructor(
    // private readonly deliveryRepo: IDeliveryRepository,
    private readonly postRepo: IPostRepository,
    private readonly storeRepo: IStoreRepository,
    private readonly settlementRepo: ISettlementRepository,
  ) {}

  async execute(
    selector?: DeliveryTypeListGetBySettlementRefSelector,
  ): Promise<any> {
    DELIVERY_TYPE;
    // const { settlementRef } = selector;
    if (!selector) {
      return DELIVERY_TYPE;
    }

    const [post, store, settlement] = await Promise.all([
      this.postRepo.getPostOfficeListBySettlementRef(selector),
      this.storeRepo.getListBySettlementRefWithRelation(selector),
      this.settlementRepo.searchByRef(selector),
    ]);

    console.log("output_log: POST =>>>", post);
    console.log("output_log: STORE =>>>", store);
    console.log("output_log: SETTLEMENT =>>>", settlement);
  }
}
