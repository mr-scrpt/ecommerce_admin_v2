import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { inject, injectable } from "inversify";

export const API_BASE_URL = "baseURL";

@injectable()
export class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor(@inject(API_BASE_URL) private baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
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
