import { StoreEntity } from "@/entities/store";
import { ForbiddenError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { StoreUpdateComplexible } from "../_domain/types";
import { StoreUpdateTx } from "../_tx/storeUpdate.transaction";
import { createStoreAbility } from "@/entities/store/server";
import { injectable } from "inversify";

type UpdateStore = {
  dataToUpdate: StoreUpdateComplexible;
  session: SessionEntity;
};

@injectable()
export class UpdateStoreComplexibleUseCase {
  constructor(private readonly storeUpdateTx: StoreUpdateTx) {}

  async exec(data: UpdateStore): Promise<StoreEntity> {
    const { dataToUpdate, session } = data;

    const { canUpdateStore } = createStoreAbility(session);

    if (!canUpdateStore()) {
      throw new ForbiddenError();
    }

    return await this.storeUpdateTx.updateStoreComplexible(dataToUpdate);
  }
}
