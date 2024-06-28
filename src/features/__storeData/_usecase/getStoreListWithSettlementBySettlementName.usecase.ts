import { StoreWithSettlementName } from "@/entities/store";
import { createStoreAbility } from "@/entities/store/server";
import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { injectable } from "inversify";
import { StoreDataTx } from "../_tx/storeData.transaction";

type GetStoreWithSettlementNameListBySettlement = {
  session: SessionEntity;
  settlement: string;
};

@injectable()
export class GetStoreListWithSettlementNameBySettlementUseCase {
  constructor(private readonly storeDataTx: StoreDataTx) {}

  async exec(
    data: GetStoreWithSettlementNameListBySettlement,
  ): Promise<StoreWithSettlementName[]> {
    const { session, settlement } = data;
    const { canGetStore } = createStoreAbility(session);

    if (!canGetStore()) {
      throw new AuthorizatoinError();
    }

    return await this.storeDataTx.getStoreWithSettlementNameListBySettlement(
      settlement,
    );
  }
}
