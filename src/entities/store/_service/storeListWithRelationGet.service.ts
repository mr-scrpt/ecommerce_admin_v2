import { injectable } from "inversify";
import { IStoreRepository } from "../_domain/repository.type";
import { Store, StoreRelation } from "../_domain/types";

@injectable()
export class StoreListWithRelationGetService {
  constructor(private readonly storeRepo: IStoreRepository) {}

  async execute(): Promise<StoreRelation[]> {
    return await this.storeRepo.getListWithRelation();
  }
}
