import { HttpClient } from "@/shared/api/httpClient";
import { configPrivate } from "@/shared/config/private.config";
import { inject, injectable } from "inversify";
import {
  NovaPoshtaResponse,
  PostOfficeNovaPoshta,
  SettlementNovaPoshta,
} from "./novaposhta.type";

export const API_NOVA_POSHTA_KEY = Symbol("apiKey");

export const modelName = {
  address: "Address",
};

export const calledMethod = {
  getPostOffice: "getWarehouses",
  getSettlements: "getSettlements",
};

@injectable()
export class NovaPoshtaApi {
  constructor(
    readonly client: HttpClient,
    @inject(API_NOVA_POSHTA_KEY) private readonly apiKey: string,
  ) {}

  async getPostOfficeListBySettlement(
    s: string,
  ): Promise<PostOfficeNovaPoshta[]> {
    const result = await this.client.post<
      NovaPoshtaResponse<PostOfficeNovaPoshta[]>
    >(configPrivate.API_NOVA_POSHTA_URL, {
      apiKey: this.apiKey,
      modelName: modelName.address,
      calledMethod: calledMethod.getPostOffice,
      methodProperties: {
        SettlementRef: s,
      },
    });

    return result.data.data;
  }

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
