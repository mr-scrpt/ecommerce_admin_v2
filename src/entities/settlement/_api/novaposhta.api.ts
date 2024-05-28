import { configPrivate } from "@/shared/config/private.config";
import { ApiClient } from "@/shared/lib/httpClient";
import {
  NovaPoshtaResponse,
  SettlementNovaPoshta,
} from "@/shared/lib/novaposhta/novaposhta.type";

import { inject, injectable } from "inversify";

// export const API_NOVA_POSHTA_KEY = "apiKey";

export const modelName = {
  address: "Address",
};

export const calledMethod = {
  getSettlements: "getSettlements",
};

const { API_NOVA_POSHTA_KEY } = configPrivate;
@injectable()
export class NovaPoshtaApi {
  constructor(readonly client: ApiClient) {}

  async getSettlementListSearch(q: string): Promise<SettlementNovaPoshta[]> {
    const result = await this.client.post<
      NovaPoshtaResponse<SettlementNovaPoshta[]>
    >(configPrivate.API_NOVA_POSHTA_URL, {
      apiKey: API_NOVA_POSHTA_KEY,
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
      apiKey: API_NOVA_POSHTA_KEY,
      modelName: modelName.address,
      calledMethod: calledMethod.getSettlements,
      methodProperties: {
        Page: page,
      },
    });
    return result.data.data;
  }
}
