import { injectable } from "inversify";
import { IStoreRepository } from "../../../kernel/domain/store/repository.type";
import { StoreGetBySettlementRefDTO } from "../../../kernel/domain/store/store.dto";
import { Store } from "@/kernel/domain/store/store.type";

@injectable()
export class StoreListGetBySettlementRefService {
  constructor(private readonly storeRepo: IStoreRepository) {}

  async execute(selector: StoreGetBySettlementRefDTO): Promise<Store[]> {
    // if (!selector.settlementRef) {
    // }

    return await this.storeRepo.getListBySettlementRef(selector);
  }
}
