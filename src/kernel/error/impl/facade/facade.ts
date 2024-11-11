import { inject, injectable } from "inversify";
import { IErrorAdapterFacade } from "../../core/facade/types";
import { ERROR_INJECTION_TOKENS } from "../../core/di/tokens";
import type { IErrorAdapterRegistry } from "../../core/regestry/types";
import type { IErrorAdapter } from "../../core/common/types";
import { IErrorAdapterResult } from "@/shared/error/type";

@injectable()
export class ErrorAdapterFacade implements IErrorAdapterFacade {
  constructor(
    @inject(ERROR_INJECTION_TOKENS.ErrorAdapterRegistry)
    private readonly registry: IErrorAdapterRegistry,

    @inject(ERROR_INJECTION_TOKENS.AppErrorAdapter)
    private readonly appErrorAdapter: IErrorAdapter,

    @inject(ERROR_INJECTION_TOKENS.AppCombinedErrorAdapter)
    private readonly combinedErrorAdapter: IErrorAdapter,

    @inject(ERROR_INJECTION_TOKENS.ZodErrorAdapter)
    private readonly zodErrorAdapter: IErrorAdapter,
  ) {
    this.initializeAdapters();
  }

  private initializeAdapters(): void {
    this.registry.register(this.appErrorAdapter);
    this.registry.register(this.combinedErrorAdapter);
    this.registry.register(this.zodErrorAdapter);
  }

  adaptError(error: unknown): IErrorAdapterResult {
    const adapter = this.registry.getAdapter(error);
    return adapter.adapt(error);
  }
}
