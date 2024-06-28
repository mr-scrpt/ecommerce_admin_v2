import { injectable } from "inversify";
import { IStoreRepository } from "../../../kernel/domain/store/repository.type";
import { StoreGetBySettlementRefDTO } from "../../../kernel/domain/store/store.dto";
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
