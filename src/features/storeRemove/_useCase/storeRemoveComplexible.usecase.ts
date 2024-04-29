import { ForbiddenError } from "@/shared/lib/errors";
import { StoreRemoveTx } from "../_tx/storeRemove.transaction";
import { StoreEntity } from "@/entities/store";
import { SessionEntity } from "@/shared/lib/user";
import { createStoreAbility } from "@/entities/store/server";
import { injectable } from "inversify";

type RemoveStore = {
  storeId: string;
  session: SessionEntity;
};

@injectable()
export class RemoveStoreComplexibleUseCase {
  constructor(private readonly storeRemoveTx: StoreRemoveTx) {}

  async exec(data: RemoveStore): Promise<StoreEntity> {
    const { storeId, session } = data;
    const { canRemoveStore } = createStoreAbility(session);

    if (!canRemoveStore()) {
      throw new ForbiddenError();
    }

    return await this.storeRemoveTx.removeStoreById(storeId);
  }
}
