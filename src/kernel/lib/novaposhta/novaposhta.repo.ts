import { injectable } from "inversify";
import { NovaPoshtaApi } from "./novaposhta.api";
import { PostOfficeNovaPoshta, SettlementNovaPoshta } from "./novaposhta.type";

@injectable()
export class NovaPoshtaRepository {
  constructor(readonly np: NovaPoshtaApi) {}

  async getPostOfficeListBySettlement(
    s: string,
  ): Promise<Array<PostOfficeNovaPoshta>> {
    return await this.np.getPostOfficeListBySettlement(s);
  }

  async getSettlementListSearch(
    q: string,
  ): Promise<Array<SettlementNovaPoshta>> {
    return await this.np.getSettlementListSearch(q);
  }

  async getSettlementList(p: number): Promise<Array<SettlementNovaPoshta>> {
    return await this.np.getSettlementList(p);
  }
}
