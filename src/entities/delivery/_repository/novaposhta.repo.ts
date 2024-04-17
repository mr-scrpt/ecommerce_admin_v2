import { injectable } from "inversify";
import { NovaPoshtaApi } from "../_api/novaposhta.api";
import { SettlementNovaPostha } from "../_domain/novaposhta.type";

@injectable()
export class NovaPoshtaRepository {
  constructor(readonly np: NovaPoshtaApi) {}

  async getSettlementListSearch(
    q: string,
  ): Promise<Array<SettlementNovaPostha>> {
    return await this.np.getSettlementListSearch(q);
  }

  async getSettlementList(p: number): Promise<Array<SettlementNovaPostha>> {
    return await this.np.getSettlementList(p);
  }
}
