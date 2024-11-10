import { ContainerModule } from "inversify";
import { IErrorDetailsStrategy } from "./core/strategy/types";
import { TOKENS } from "./core/di/tokens";
import {
  InvalidEnumStrategy,
  InvalidTypeStrategy,
  SizeConstraintStrategy,
} from "./impl/strategy/zodValidation.strategy";
import { IErrorDetailsHandler } from "./core/handler/types";
import { ZodErrorDetailsHandler } from "./impl/handler/ZodHandler";
import { IFieldExtractor } from "./core/extractor/types";
import {
  LayerExtractor,
  MessageExtractor,
  TimestampExtractor,
} from "./impl/extractor/extractor";
import { ErrorAppLayer } from "@/shared/error/type";
import { IErrorBuilder } from "./core/builder/types";
import { ErrorAdaptBuilder } from "./impl/builder/errorAdapt.builder";
import { IErrorAdapter } from "./core/common/types";
import { ZodErrorAdapter } from "./impl/adapter/zodError.adapter";
import { AppErrorAdapter } from "./impl/adapter/appError.adapter";
import { AppCombinedErrorAdapter } from "./impl/adapter/appCombineError.adapter";
import { IErrorAdapterRegistry } from "./core/regestry/types";
import { ErrorAdapterRegistry } from "./impl/regestry/regestry";
import { IErrorAdapterFacade } from "./core/facade/types";
import { ErrorAdapterFacade } from "./impl/facade/facade";
import { ObjectUtils } from "./utils/object.ustils";
import { IObjectUtils } from "./core/utils/types";

export const ErrorModule = new ContainerModule((bind) => {
  // NOTE: Strategies
  bind<IErrorDetailsStrategy[]>(TOKENS.ErrorDetailsStrategies)
    .toDynamicValue((context) => {
      return [
        context.container.get<IErrorDetailsStrategy>(
          TOKENS.InvalidTypeStrategy,
        ),
        context.container.get<IErrorDetailsStrategy>(
          TOKENS.InvalidEnumStrategy,
        ),
        context.container.get<IErrorDetailsStrategy>(
          TOKENS.SizeConstraintStrategy,
        ),
      ];
    })
    .inSingletonScope();

  bind<IErrorDetailsStrategy>(TOKENS.InvalidTypeStrategy)
    .to(InvalidTypeStrategy)
    .inSingletonScope();

  bind<IErrorDetailsStrategy>(TOKENS.InvalidEnumStrategy)
    .to(InvalidEnumStrategy)
    .inSingletonScope();

  bind<IErrorDetailsStrategy>(TOKENS.SizeConstraintStrategy)
    .to(SizeConstraintStrategy)
    .inSingletonScope();

  // NOTE: Handlers
  bind<IErrorDetailsHandler>(TOKENS.ErrorDetailsHandler)
    .to(ZodErrorDetailsHandler)
    .inSingletonScope();

  // NOTE: Extractors
  bind<IFieldExtractor<Date>>(TOKENS.TimestampExtractor).to(TimestampExtractor);
  bind<IFieldExtractor<string>>(TOKENS.MessageExtractor).to(MessageExtractor);
  bind<IFieldExtractor<ErrorAppLayer>>(TOKENS.LayerExtractor).to(
    LayerExtractor,
  );

  // NOTE: Builder
  bind<IErrorBuilder>(TOKENS.ErrorBuilder).to(ErrorAdaptBuilder);

  // NOTE: Adapters
  bind<IErrorAdapter>(TOKENS.ZodErrorAdapter).to(ZodErrorAdapter);
  bind<IErrorAdapter>(TOKENS.AppErrorAdapter).to(AppErrorAdapter);
  bind<IErrorAdapter>(TOKENS.AppCombinedErrorAdapter).to(
    AppCombinedErrorAdapter,
  );

  // NOTE: Registry
  bind<IErrorAdapterRegistry>(TOKENS.ErrorAdapterRegistry).to(
    ErrorAdapterRegistry,
  );

  // NOTE: Facade
  bind<IErrorAdapterFacade>(TOKENS.ErrorAdapterFacade).to(ErrorAdapterFacade);

  // // NOTE: Utils
  bind<IObjectUtils>(TOKENS.ObjectUtils).to(ObjectUtils);
});
