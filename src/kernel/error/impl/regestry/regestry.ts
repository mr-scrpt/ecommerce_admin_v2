import { injectable } from "inversify";
import { IErrorAdapter } from "../../domain/common/types";
import { IErrorAdapterRegistry } from "../../domain/regestry/types";

@injectable()
export class ErrorAdapterRegistry implements IErrorAdapterRegistry {
  private readonly adapters: IErrorAdapter[] = [];

  register(adapter: IErrorAdapter): void {
    this.adapters.push(adapter);
  }

  getAdapter(error: unknown): IErrorAdapter {
    const adapter = this.adapters.find((adapter) => adapter.canAdapt(error));

    if (!adapter) {
      throw new Error(`No suitable adapter found for error: ${error}`);
    }

    return adapter;
  }
}
