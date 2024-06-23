import { injectable } from "inversify";
import { IStoreRepository } from "../_domain/repository.type";
import { StoreGetBySettlementRefDTO } from "../_domain/store.dto";
import { Store } from "@/kernel/domain/store/store.type";

@injectable()
export class StoreListGetBySettlementRefService {
  constructor(private readonly storeRepo: IStoreRepository) {}

  async execute(selector: StoreGetBySettlementRefDTO): Promise<Store[]> {
    return await this.storeRepo.getListBySettlementRef(selector);
  }
}
