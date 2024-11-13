import { ContainerModule } from "inversify";
import { IErrorDetailsStrategy } from "./domain/strategy/types";
import { ERROR_INJECTION_TOKENS } from "./domain/di/tokens";
import {
  InvalidEnumStrategy,
  InvalidTypeStrategy,
  SizeConstraintStrategy,
} from "./impl/strategy/zodValidation.strategy";
import { IErrorDetailsHandler } from "./domain/handler/types";
import { ZodErrorDetailsHandler } from "./impl/handler/ZodHandler";
import { IFieldExtractor } from "./domain/extractor/types";
import { LayerExtractor } from "./impl/extractor/layer.extractor";
import { ErrorAppLayer, IStackFrame } from "@/shared/error/type";
import { IErrorAdaptBuilder } from "./domain/builder/types";
import { AppErrorAdaptBuilder } from "./impl/builder/appErrorAdapt.builder";
import { IErrorAdapter } from "./domain/common/types";
import { ZodErrorAdapter } from "./impl/adapter/zodError.adapter";
import { AppErrorAdapter } from "./impl/adapter/appError.adapter";
import { AppCombinedErrorAdapter } from "./impl/adapter/appCombineError.adapter";
import { IErrorAdapterRegistry } from "./domain/regestry/types";
import { ErrorAdapterRegistry } from "./impl/regestry/regestry";
import { IErrorAdapterFacade } from "./domain/facade/types";
import { ErrorAdapterFacade } from "./impl/facade/facade";
import { ObjectUtils } from "./utils/object.ustils";
import { IObjectUtils } from "./domain/utils/types";
import { StackExtractor } from "./impl/extractor/stack.extractor";
import { TimestampExtractor } from "./impl/extractor/timestamp.extractor";
import { MessageExtractor } from "./impl/extractor/message.extractor";
import { ZodErrorAdaptBuilder } from "./impl/builder/zodErrorAdapt.builder";

export const ErrorModule = new ContainerModule((bind) => {
  // NOTE: Strategies
  bind<IErrorDetailsStrategy[]>(ERROR_INJECTION_TOKENS.ErrorDetailsStrategies)
    .toDynamicValue((context) => {
      return [
        context.container.get<IErrorDetailsStrategy>(
          ERROR_INJECTION_TOKENS.InvalidTypeStrategy,
        ),
        context.container.get<IErrorDetailsStrategy>(
          ERROR_INJECTION_TOKENS.InvalidEnumStrategy,
        ),
        context.container.get<IErrorDetailsStrategy>(
          ERROR_INJECTION_TOKENS.SizeConstraintStrategy,
        ),
      ];
    })
    .inSingletonScope();

  bind<IErrorDetailsStrategy>(ERROR_INJECTION_TOKENS.InvalidTypeStrategy)
    .to(InvalidTypeStrategy)
    .inSingletonScope();

  bind<IErrorDetailsStrategy>(ERROR_INJECTION_TOKENS.InvalidEnumStrategy)
    .to(InvalidEnumStrategy)
    .inSingletonScope();

  bind<IErrorDetailsStrategy>(ERROR_INJECTION_TOKENS.SizeConstraintStrategy)
    .to(SizeConstraintStrategy)
    .inSingletonScope();

  // NOTE: Handlers
  bind<IErrorDetailsHandler>(ERROR_INJECTION_TOKENS.ErrorDetailsHandler)
    .to(ZodErrorDetailsHandler)
    .inSingletonScope();

  // NOTE: Extractors
  bind<IFieldExtractor<Date>>(ERROR_INJECTION_TOKENS.TimestampExtractor).to(
    TimestampExtractor,
  );
  bind<IFieldExtractor<string>>(ERROR_INJECTION_TOKENS.MessageExtractor).to(
    MessageExtractor,
  );
  bind<IFieldExtractor<ErrorAppLayer>>(
    ERROR_INJECTION_TOKENS.LayerExtractor,
  ).to(LayerExtractor);
  bind<IFieldExtractor<IStackFrame[]>>(ERROR_INJECTION_TOKENS.StackExtractor)
    .to(StackExtractor)
    .inSingletonScope();

  // NOTE: Builder
  bind<IErrorAdaptBuilder>(ERROR_INJECTION_TOKENS.AppErrorAdaptBuilder).to(
    AppErrorAdaptBuilder,
  );
  bind<IErrorAdaptBuilder>(ERROR_INJECTION_TOKENS.ZodErrorAdaptBuilder).to(
    ZodErrorAdaptBuilder,
  );

  // NOTE: Adapters
  bind<IErrorAdapter>(ERROR_INJECTION_TOKENS.ZodErrorAdapter).to(
    ZodErrorAdapter,
  );
  bind<IErrorAdapter>(ERROR_INJECTION_TOKENS.AppErrorAdapter).to(
    AppErrorAdapter,
  );
  bind<IErrorAdapter>(ERROR_INJECTION_TOKENS.AppCombinedErrorAdapter).to(
    AppCombinedErrorAdapter,
  );

  // NOTE: Registry
  bind<IErrorAdapterRegistry>(ERROR_INJECTION_TOKENS.ErrorAdapterRegistry).to(
    ErrorAdapterRegistry,
  );

  // NOTE: Facade
  bind<IErrorAdapterFacade>(ERROR_INJECTION_TOKENS.ErrorAdapterFacade).to(
    ErrorAdapterFacade,
  );

  // // NOTE: Utils
  bind<IObjectUtils>(ERROR_INJECTION_TOKENS.ObjectUtils).to(ObjectUtils);
});
