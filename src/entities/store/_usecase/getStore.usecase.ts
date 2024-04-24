import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { injectable } from "inversify";
import { createStoreAbility } from "../_domain/store.ability";
import { StoreEntity } from "../_domain/types";
import { StoreRepository } from "../_repository/store.repo";

type GetStore = {
  storeId: string;
  session: SessionEntity;
};

@injectable()
export class GetStoreUseCase {
  constructor(private readonly storeRepo: StoreRepository) {}

  async exec(data: GetStore): Promise<StoreEntity> {
    const { storeId, session } = data;
    const { canGetStore } = createStoreAbility(session);

    if (!canGetStore()) {
      throw new AuthorizatoinError();
    }

    return await this.storeRepo.getStore(storeId);
  }
}
