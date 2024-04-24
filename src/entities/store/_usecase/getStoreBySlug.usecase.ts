import { StoreEntity, StoreId } from "../_domain/types";
import { StoreRepository } from "../_repository/store.repo";
import { createStoreAbility } from "../_domain/store.ability";
import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { injectable } from "inversify";

type GetStore = {
  storeSlug: StoreId;
  session: SessionEntity;
};

@injectable()
export class GetStoreBySlugUseCase {
  constructor(private readonly storeRepo: StoreRepository) {}

  async exec(data: GetStore): Promise<StoreEntity> {
    const { storeSlug, session } = data;
    const { canGetStore } = createStoreAbility(session);

    if (!canGetStore()) {
      throw new AuthorizatoinError();
    }

    return await this.storeRepo.getStoreBySlug(storeSlug);
  }
}
