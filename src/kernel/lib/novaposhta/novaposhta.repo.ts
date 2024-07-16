import { injectable } from "inversify";
import { NovaPoshtaApi } from "./novaposhta.api";
import { PostOfficeNovaPoshta, SettlementNovaPoshta } from "./novaposhta.type";
import { INovaPoshtaRepository } from "./repository.type";

@injectable()
export class NovaPoshtaRepository implements INovaPoshtaRepository {
  constructor(readonly np: NovaPoshtaApi) {}

  async getPostOfficeListBySettlementRef(
    s: string,
  ): Promise<Array<PostOfficeNovaPoshta>> {
    const res = await this.np.getPostOfficeListBySettlementRef(s);
    // console.log("output_log: s , res =>>>", s, res);
    return res;
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
