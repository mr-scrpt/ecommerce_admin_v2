import { configPrivate } from "@/shared/config/private.config";
import { ApiClient } from "@/shared/lib/httpClient";
import {
  NovaPoshtaResponse,
  PostOfficeNovaPoshta,
} from "@/shared/lib/novaposhta/novaposhta.type";
import { inject, injectable } from "inversify";

export const API_NOVA_POSHTA_KEY = "apiKey";

export const modelName = {
  address: "Address",
};

export const calledMethod = {
  getWarehouses: "getWarehouses",
};

@injectable()
export class NovaPoshtaApi {
  constructor(
    readonly client: ApiClient,
    @inject(API_NOVA_POSHTA_KEY) private readonly apiKey: string,
  ) {}

  async getPostListBySettlement(s: string): Promise<PostOfficeNovaPoshta[]> {
    const result = await this.client.post<
      NovaPoshtaResponse<PostOfficeNovaPoshta[]>
    >(configPrivate.API_NOVA_POSHTA_URL, {
      apiKey: this.apiKey,
      modelName: modelName.address,
      calledMethod: calledMethod.getWarehouses,
      methodProperties: {
        SettlementRef: s,
      },
    });

    return result.data.data;
  }
}
