import { StoreEntity, StoreToSelect } from "@/entities/store";
import { createStoreAbility } from "@/entities/store/server";
import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { injectable } from "inversify";
import { StoreDataTx } from "../_tx/storeData.transaction";

type GetStoreSettlementToSelect = {
  session: SessionEntity;
  settlement: string;
};

@injectable()
export class GetStoreSettlementToSelectUseCase {
  constructor(private readonly storeDataTx: StoreDataTx) {}

  async exec(data: GetStoreSettlementToSelect): Promise<StoreToSelect[]> {
    const { session, settlement } = data;
    const { canGetStore } = createStoreAbility(session);

    if (!canGetStore()) {
      throw new AuthorizatoinError();
    }

    const storeList =
      await this.storeDataTx.getStoreWithSettlementNameListBySettlement(
        settlement,
      );

    return this.mapToSelect(storeList);
  }

  async mapToSelect(data: Array<StoreEntity>): Promise<Array<StoreToSelect>> {
    return data.map((store) => {
      return {
        value: store.settlementRef,
        label: store.name,
      };
    });
  }
}
