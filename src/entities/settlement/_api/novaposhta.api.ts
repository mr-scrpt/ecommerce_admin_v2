import { configPrivate } from "@/shared/config/private.config";
import { ApiClient } from "@/shared/lib/httpClient";
import {
  NovaPoshtaResponse,
  SettlementNovaPoshta,
} from "@/shared/lib/novaposhta/novaposhta.type";
import { inject, injectable } from "inversify";

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

  async getSettlementListSearch(q: string): Promise<SettlementNovaPoshta[]> {
    const result = await this.client.post<
      NovaPoshtaResponse<SettlementNovaPoshta[]>
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

  async getSettlementList(page: number): Promise<SettlementNovaPoshta[]> {
    const result = await this.client.post<
      NovaPoshtaResponse<SettlementNovaPoshta[]>
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
