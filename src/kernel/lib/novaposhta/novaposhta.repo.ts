import { injectable } from "inversify";
import { NovaPoshtaApi } from "./novaposhta.api";
import { PostOfficeNovaPoshta, SettlementNovaPoshta } from "./novaposhta.type";
import { INovaPoshtaRepository } from "./repository.type";

@injectable()
export class NovaPoshtaRepository implements INovaPoshtaRepository {
  constructor(readonly np: NovaPoshtaApi) {}

  async getPostOffice(id: string): Promise<PostOfficeNovaPoshta> {
    return await this.np.getPostOffice(id);
  }

  async getPostOfficeListBySettlementRef(
    s: string,
  ): Promise<Array<PostOfficeNovaPoshta>> {
    const res = await this.np.getPostOfficeListBySettlementRef(s);
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
