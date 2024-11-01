import { injectable } from "inversify";
import {
  DefaultErrorAdapter,
  ErrorAdapter,
  AppCombinedErrorAdapter,
  ZodErrorAdapter,
  AppErrorAdapter,
} from "./error.adapter";
import { TRPCError } from "@trpc/server";
import { IErrorAdapterResult } from "./type";

@injectable()
export class ErrorAdapterService {
  private readonly adapters: ErrorAdapter[];

  constructor() {
    this.adapters = [
      new ZodErrorAdapter(),
      new AppCombinedErrorAdapter(),
      new AppErrorAdapter(),
      new DefaultErrorAdapter(),
    ];
  }

  adapt(error: TRPCError): IErrorAdapterResult {
    const adapter = this.adapters.find((a) => a.canAdapt(error.cause));
    return adapter!.adapt(error.cause);
  }
}
