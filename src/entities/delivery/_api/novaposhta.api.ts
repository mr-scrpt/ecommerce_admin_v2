import { configPrivate } from "@/shared/config/private.config";
import { ApiClient } from "@/shared/lib/httpClient";
import { inject, injectable } from "inversify";
import {
  NovaPoshtaResponse,
  SettlementNovaPostha,
} from "../_domain/novaposhta.type";

export const API_NOVA_POSHTA_KEY = "apiKey";

export const modelName = {
  address: "Address",
};

export const calledMethod = {
  getSettlements: "getSettlements",
};

@injectable()
export class NovaPoshtaApi {
  constructor(
    readonly client: ApiClient,
    @inject(API_NOVA_POSHTA_KEY) private readonly apiKey: string,
  ) {}

  async getSettlementListSearch(q: string): Promise<SettlementNovaPostha[]> {
    const result = await this.client.post<
      NovaPoshtaResponse<SettlementNovaPostha[]>
    >(configPrivate.API_NOVA_POSHTA_URL, {
      apiKey: this.apiKey,
      modelName: modelName.address,
      calledMethod: calledMethod.getSettlements,
      methodProperties: {
        FindByString: q,
      },
    });

    return result.data.data;
  }

  async getSettlementList(page: number): Promise<SettlementNovaPostha[]> {
    const result = await this.client.post<
      NovaPoshtaResponse<SettlementNovaPostha[]>
    >(configPrivate.API_NOVA_POSHTA_URL, {
      apiKey: this.apiKey,
      modelName: modelName.address,
      calledMethod: calledMethod.getSettlements,
      methodProperties: {
        Page: page,
      },
    });
    return result.data.data;
  }
}
