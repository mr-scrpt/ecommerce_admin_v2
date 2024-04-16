import { injectable } from "inversify";
import { NovaPoshtaApi } from "../_api/novaposhta.api";
import { SettlementEntity } from "../_domain/novaposhta.type";

@injectable()
export class NovaPoshtaRepository {
  constructor(readonly np: NovaPoshtaApi) {}

  async getSettlementListSearch(q: string): Promise<Array<SettlementEntity>> {
    const result = await this.np.getSettlementListSearch(q);
    // console.log("output_log:  =>>>", result.data);

    return result.data;
  }
}
