import { injectable } from "inversify";
import { NovaPoshtaApi } from "../_api/novaposhta.api";
import { PostOfficeNovaPoshta } from "@/shared/lib/novaposhta/novaposhta.type";

@injectable()
export class NovaPoshtaRepository {
  constructor(readonly np: NovaPoshtaApi) {}

  async getPostOfficeList(s: string): Promise<Array<PostOfficeNovaPoshta>> {
    return await this.np.getPostListBySettlement(s);
  }
}
