import { injectable } from "inversify";
import { IStoreRepository } from "../../../kernel/domain/store/repository.type";
import { StoreGetSelector, StoreRelation } from "../_domain/types";

@injectable()
export class StoreWithRelationGetService {
  constructor(private readonly storeRepo: IStoreRepository) {}

  async execute(selector: StoreGetSelector): Promise<StoreRelation> {
    return await this.storeRepo.getWithRelation<StoreRelation>(selector);
  }
}
