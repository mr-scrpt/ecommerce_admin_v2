import { injectable } from "inversify";
import { IStoreRepository } from "../../../kernel/domain/store/repository.type";
import { Store } from "@/kernel/domain/store/store.type";

@injectable()
export class StoreListGetService {
  constructor(private readonly storeRepo: IStoreRepository) {}

  async execute(): Promise<Store[]> {
    return await this.storeRepo.getList();
  }
}
