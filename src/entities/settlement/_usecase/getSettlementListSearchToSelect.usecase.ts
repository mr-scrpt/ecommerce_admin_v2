import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { injectable } from "inversify";
import { SettlementNovaPostha } from "../_domain/novaposhta.type";
import { NovaPoshtaRepository } from "../_repository/novaposhta.repo";
import { SettleToSelect } from "../_domain/settlement.type";
import { createSettlementAbility } from "../_domain/settlement.ability";

type GetSettlementListSearchToSelect = {
  q: string;
  session: SessionEntity;
};

@injectable()
export class GetSettlementListSearchToSelectUseCase {
  constructor(private readonly np: NovaPoshtaRepository) {}

  async exec(
    data: GetSettlementListSearchToSelect,
  ): Promise<Array<SettleToSelect>> {
    const { session, q } = data;
    const { canGetSettlement } = createSettlementAbility(session);

    if (!canGetSettlement()) {
      throw new AuthorizatoinError();
    }

    const result = await this.np.getSettlementListSearch(q);

    return await this.mapToSelect(result);
  }

  async mapToSelect(
    data: Array<SettlementNovaPostha>,
  ): Promise<Array<SettleToSelect>> {
    return data.map((settlement) => {
      return {
        value: settlement.Ref,
        area: settlement.Area,
        label: settlement.DescriptionTranslit,
      };
    });
  }
}
