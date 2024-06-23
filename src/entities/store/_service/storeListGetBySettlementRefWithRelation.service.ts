import { injectable } from "inversify";
import { IStoreRepository } from "../_domain/repository.type";
import { StoreGetBySettlementRefDTO } from "../_domain/store.dto";
import { StoreRelation } from "../_domain/types";

@injectable()
export class StoreListGetBySettlementRefWithRelationService {
  constructor(private readonly storeRepo: IStoreRepository) {}

  async execute(
    selector: StoreGetBySettlementRefDTO,
  ): Promise<StoreRelation[]> {
    return await this.storeRepo.getListBySettlementRefWithRelation(selector);
  }
}
