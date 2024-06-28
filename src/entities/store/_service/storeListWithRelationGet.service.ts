import { injectable } from "inversify";
import { IStoreRepository } from "../../../kernel/domain/store/repository.type";
import { StoreRelation } from "../_domain/types";

@injectable()
export class StoreListWithRelationGetService {
  constructor(private readonly storeRepo: IStoreRepository) {}

  async execute(): Promise<Array<StoreRelation>> {
    return await this.storeRepo.getListWithRelation();
  }
}
