import { TRPCError } from "@trpc/server";
import { injectable } from "inversify";
import {
  AppCombinedErrorAdapter,
  AppErrorAdapter,
  DefaultErrorAdapter,
  IErrorAdapter,
  IErrorAdapterResult,
  // ZodErrorAdapter,
} from "./error.adapter";

@injectable()
export class ErrorAdapterService {
  private readonly adapters: IErrorAdapter[];

  constructor() {
    this.adapters = [
      // new ZodErrorAdapter(),
      new AppCombinedErrorAdapter(new AppErrorAdapter()),
      new AppErrorAdapter(),
      new DefaultErrorAdapter(),
    ];
  }

  adapt(error: TRPCError): IErrorAdapterResult {
    // console.log("input_log: ERROR =>>>", JSON.stringify(error, null, 2));
    // console.log("input_log: ERROR =>>>", error);
    // console.log(
    //   "input_log: ERROR CAUSE =>>>",
    //   JSON.stringify(error.cause, null, 2),
    // );
    const adapter = this.adapters.find((a) => a.canAdapt(error.cause));
    return adapter!.adapt(error.cause);
  }
}
