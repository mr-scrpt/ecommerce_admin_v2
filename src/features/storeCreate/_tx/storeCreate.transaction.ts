import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { StoreCreateTxDTO } from "../_domain/types";
import { IStoreRepository } from "@/kernel/domain/store/repository.type";
import { StoreEntity } from "@/kernel/domain/store/store.type";

@injectable()
export class StoreCreateTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly storeRepo: IStoreRepository,
  ) {
    super(db);
  }

  async create(dto: StoreCreateTxDTO): Promise<StoreEntity> {
    const action = async (tx: Tx) => {
      const { storeData } = dto;
      const { id } = await this.storeRepo.create({ data: storeData }, tx);

      return await this.storeRepo.get({ id }, tx);
    };

    return await this.start(action);
  }
}
