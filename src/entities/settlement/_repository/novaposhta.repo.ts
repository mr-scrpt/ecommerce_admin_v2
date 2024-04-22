import { injectable } from "inversify";
import { NovaPoshtaApi } from "../_api/novaposhta.api";
import { SettlementNovaPoshta } from "@/shared/lib/novaposhta/novaposhta.type";

@injectable()
export class NovaPoshtaRepository {
  constructor(readonly np: NovaPoshtaApi) {}

  async getSettlementListSearch(
    q: string,
  ): Promise<Array<SettlementNovaPoshta>> {
    return await this.np.getSettlementListSearch(q);
  }

  async getSettlementList(p: number): Promise<Array<SettlementNovaPoshta>> {
    return await this.np.getSettlementList(p);
  }
}
