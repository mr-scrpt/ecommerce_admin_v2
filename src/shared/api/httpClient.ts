import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { inject, injectable } from "inversify";

export const BASE_URL = Symbol("baseUrl");

@injectable()
export class HttpClient {
  private axiosInstance: AxiosInstance;

  constructor(@inject(BASE_URL) private readonly baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
    });
  }

  public get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config);
  }

  public post<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config);
  }

  public put<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, config);
  }

  public delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config);
  }
}
