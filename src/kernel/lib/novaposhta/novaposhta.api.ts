import { HttpClient } from "@/shared/api/httpClient";
import { configPrivate } from "@/shared/config/private.config";
import { inject, injectable } from "inversify";
import {
  novaPoshtaPostOfficeListSchema,
  novaPoshtaSettlementBaseListSchema,
} from "./novaposhta.schema";
import {
  NovaPoshtaResponse,
  PostOfficeNovaPoshta,
  SettlementNovaPoshta,
} from "./novaposhta.type";

export const API_NOVA_POSHTA_KEY = Symbol("apiKey");
const REQUEST_DELAY = 1000;

export const modelName = {
  address: "Address",
};

export const calledMethod = {
  getPostOffice: "getWarehouses",
  getSettlements: "getSettlements",
};

type RequestParams = { [key: string]: any };

interface QueueItem<T> {
  params: RequestParams;
  resolve: (value: T) => void;
  reject: (reason?: any) => void;
}

@injectable()
export class NovaPoshtaApi {
  private requestQueue: Array<QueueItem<any>> = [];
  private lastRequestTime: number = 0;
  private cache: Map<string, any> = new Map();

  constructor(
    readonly client: HttpClient,
    @inject(API_NOVA_POSHTA_KEY) private readonly apiKey: string,
  ) {}

  private generateCacheKey(method: string, params: RequestParams): string {
    return `${method}:${JSON.stringify(params)}`;
  }

  private async processQueue() {
    if (this.requestQueue.length === 0) return;

    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    const delay = Math.max(REQUEST_DELAY - timeSinceLastRequest, 0);

    setTimeout(async () => {
      const { params, resolve, reject } = this.requestQueue.shift()!;

      try {
        const cacheKey = this.generateCacheKey(
          params.calledMethod,
          params.methodProperties,
        );
        if (this.cache.has(cacheKey)) {
          resolve(this.cache.get(cacheKey));
          return;
        }

        const result = await this.client.post<NovaPoshtaResponse<any>>(
          configPrivate.API_NOVA_POSHTA_URL,
          {
            apiKey: this.apiKey,
            ...params,
          },
        );

        this.cache.set(cacheKey, result.data.data);
        resolve(result.data.data);
        this.lastRequestTime = Date.now();
      } catch (error) {
        reject(error);
      } finally {
        this.processQueue();
      }
    }, delay);
  }

  private enqueueRequest<T>(params: RequestParams): Promise<T> {
    return new Promise((resolve, reject) => {
      this.requestQueue.push({ params, resolve, reject });
      if (this.requestQueue.length === 1) {
        this.processQueue();
      }
    });
  }

  async getPostOfficeListBySettlementRef(
    s: string,
  ): Promise<PostOfficeNovaPoshta[]> {
    const result = await this.enqueueRequest<PostOfficeNovaPoshta[]>({
      modelName: modelName.address,
      calledMethod: calledMethod.getPostOffice,
      methodProperties: { SettlementRef: s },
    });

    const parsed = novaPoshtaPostOfficeListSchema.parse(result);
    return parsed;
  }

  async getSettlementListSearch(q: string): Promise<SettlementNovaPoshta[]> {
    const result = this.enqueueRequest({
      modelName: modelName.address,
      calledMethod: calledMethod.getSettlements,
      methodProperties: { FindByString: q },
    });

    const parsed = novaPoshtaSettlementBaseListSchema.parse(result);
    return parsed;
  }

  async getSettlementList(page: number): Promise<SettlementNovaPoshta[]> {
    const result = await this.enqueueRequest<SettlementNovaPoshta[]>({
      modelName: modelName.address,
      calledMethod: calledMethod.getSettlements,
      methodProperties: { Page: page },
    });
    return novaPoshtaSettlementBaseListSchema.parse(result);
  }
}

// @injectable()
// export class NovaPoshtaApi {
//   constructor(
//     readonly client: HttpClient,
//     @inject(API_NOVA_POSHTA_KEY) private readonly apiKey: string,
//   ) {}
//
//   async getPostOfficeListBySettlementRef(
//     s: string,
//   ): Promise<PostOfficeNovaPoshta[]> {
//     const result = await this.client.post<
//       NovaPoshtaResponse<PostOfficeNovaPoshta[]>
//     >(configPrivate.API_NOVA_POSHTA_URL, {
//       apiKey: this.apiKey,
//       modelName: modelName.address,
//       calledMethod: calledMethod.getPostOffice,
//       methodProperties: {
//         SettlementRef: s,
//       },
//     });
//
//     return result.data.data;
//   }
//
//   async getSettlementListSearch(q: string): Promise<SettlementNovaPoshta[]> {
//     const result = await this.client.post<
//       NovaPoshtaResponse<SettlementNovaPoshta[]>
//     >(configPrivate.API_NOVA_POSHTA_URL, {
//       apiKey: this.apiKey,
//       modelName: modelName.address,
//       calledMethod: calledMethod.getSettlements,
//       methodProperties: {
//         FindByString: q,
//       },
//     });
//
//     return result.data.data;
//   }
//
//   async getSettlementList(page: number): Promise<SettlementNovaPoshta[]> {
//     const result = await this.client.post<
//       NovaPoshtaResponse<SettlementNovaPoshta[]>
//     >(configPrivate.API_NOVA_POSHTA_URL, {
//       apiKey: this.apiKey,
//       modelName: modelName.address,
//       calledMethod: calledMethod.getSettlements,
//       methodProperties: {
//         Page: page,
//       },
//     });
//     return result.data.data;
//   }
// }
