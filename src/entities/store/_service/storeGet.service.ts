import { injectable } from "inversify";
import { IStoreRepository } from "../../../kernel/domain/store/repository.type";
import { StoreGetSelector } from "../_domain/types";
import { Store } from "@/kernel/domain/store/store.type";

@injectable()
export class StoreGetService {
  constructor(private readonly storeRepo: IStoreRepository) {}

  async execute(selector: StoreGetSelector): Promise<Store> {
    return await this.storeRepo.get(selector);
  }
}
