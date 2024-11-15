import { Container } from "inversify";
import { ErrorModule } from "./module";
import { ERROR_INJECTION_TOKENS } from "./domain/di/tokens";
import { IErrorAdapterFacade } from "./domain/facade/types";

const errorContainer = new Container({
  defaultScope: "Singleton",
  skipBaseClassChecks: true,
});

errorContainer.load(ErrorModule);

export { errorContainer };

const errorFacade = errorContainer.get<IErrorAdapterFacade>(
  ERROR_INJECTION_TOKENS.ErrorAdapterFacade,
);

export { errorFacade };
