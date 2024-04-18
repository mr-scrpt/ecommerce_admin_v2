import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { injectable } from "inversify";
import { SettlementNovaPostha } from "../_domain/novaposhta.type";
import { createSettlementAbility } from "../_domain/settlement.ability";
import { SettleToSelect, SettlementEntity } from "../_domain/settlement.type";
import { SettlementRepository } from "../_repository/settlement.repo";
import { SEARCH_MIN_LENGTH } from "@/shared/config/constant";

type GetSettlementListSearchToSelect = {
  q: string;
  session: SessionEntity;
};

@injectable()
export class GetSettlementListSearchToSelectUseCase {
  constructor(private readonly settlementRepo: SettlementRepository) {}

  async exec(
    data: GetSettlementListSearchToSelect,
  ): Promise<Array<SettleToSelect>> {
    const { session, q } = data;
    const { canGetSettlement } = createSettlementAbility(session);

    if (!canGetSettlement()) {
      throw new AuthorizatoinError();
    }
    if (!q || q === "" || q.length < SEARCH_MIN_LENGTH) {
      return [];
    }

    // const result = await this.np.getSettlementListSearch(q);
    const result = await this.settlementRepo.getSettlementListSearch(q);

    return await this.mapToSelect(result);
  }

  async mapToSelect(
    data: Array<SettlementEntity>,
  ): Promise<Array<SettleToSelect>> {
    return data.map((settlement) => {
      return {
        value: settlement.ref,
        area: settlement.areaDescription,
        region: settlement.regionsDescription,
        label: settlement.description,
      };
    });
  }
}
