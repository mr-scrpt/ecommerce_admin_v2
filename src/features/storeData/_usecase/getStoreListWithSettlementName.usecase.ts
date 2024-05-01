import { StoreWithSettlementName } from "@/entities/store";
import { createStoreAbility } from "@/entities/store/server";
import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { injectable } from "inversify";
import { StoreDataTx } from "../_tx/storeData.transaction";

type GetStoreWithSettlementNameList = {
  session: SessionEntity;
};

@injectable()
export class GetStoreListWithSettlementNameUseCase {
  constructor(private readonly storeDataTx: StoreDataTx) {}

  async exec(
    data: GetStoreWithSettlementNameList,
  ): Promise<StoreWithSettlementName[]> {
    const { session } = data;
    const { canGetStore } = createStoreAbility(session);

    if (!canGetStore()) {
      throw new AuthorizatoinError();
    }

    return await this.storeDataTx.getStoreWithSettlementNameList();
  }
}
