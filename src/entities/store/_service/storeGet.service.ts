import { injectable } from "inversify";
import { IStoreRepository } from "../_domain/repository.type";
import { Store, StoreGetSelector } from "../_domain/types";

@injectable()
export class StoreGetService {
  constructor(private readonly storeRepo: IStoreRepository) {}

  async execute(selector: StoreGetSelector): Promise<Store> {
    return await this.storeRepo.get(selector);
  }
}
