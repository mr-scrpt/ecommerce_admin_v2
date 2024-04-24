import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { injectable } from "inversify";
import { createStoreAbility } from "../_domain/store.ability";
import { Store } from "../_domain/types";
import { StoreRepository } from "../_repository/store.repo";

type GetStoreList = {
  session: SessionEntity;
};

@injectable()
export class GetStoreListUseCase {
  constructor(private readonly storeRepo: StoreRepository) {}

  async exec(data: GetStoreList): Promise<Store[]> {
    const { session } = data;
    const { canGetStore } = createStoreAbility(session);

    if (!canGetStore()) {
      throw new AuthorizatoinError();
    }
    return await this.storeRepo.getStoreList();
  }
}
