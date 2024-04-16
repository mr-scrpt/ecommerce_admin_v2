import { configPrivate } from "@/shared/config/private.config";
import { ApiClient } from "@/shared/lib/httpClient";
import { injectable } from "inversify";

@injectable()
export class NovaPoshtaApi {
  constructor(readonly client: ApiClient) {}
  async getSettlementListSearch(q: string): Promise<any> {
    const result = await this.client.post(configPrivate.API_NOVA_POSHTA_URL, {
      apiKey: "0ad2b06e490a5d55a632ed316c324e27",
      modelName: "Address",
      calledMethod: "getSettlements",
      methodProperties: {
        FindByString: q,
      },
    });

    return result.data;
  }
}
