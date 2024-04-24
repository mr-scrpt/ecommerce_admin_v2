import { StoreEntity, StoreId } from "../_domain/types";
import { StoreRepository } from "../_repository/store.repo";
import { createStoreAbility } from "../_domain/store.ability";
import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { injectable } from "inversify";

type GetStoreWithRelation = {
  storeId: StoreId;
  session: SessionEntity;
};

@injectable()
export class GetStoreWithRelationUseCase {
  constructor(private readonly storeRepo: StoreRepository) {}

  async exec(data: GetStoreWithRelation): Promise<StoreEntity> {
    const { storeId, session } = data;
    const { canGetStore } = createStoreAbility(session);

    if (!canGetStore()) {
      throw new AuthorizatoinError();
    }

    return await this.storeRepo.getStoreWithRelation(storeId);
  }
}
