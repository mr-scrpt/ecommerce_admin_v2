import { Container } from "inversify";
import { ErrorModule } from "./module";
import { TOKENS } from "./core/di/tokens";
import { IErrorAdapterFacade } from "./core/facade/types";

const errorContainer = new Container({
  defaultScope: "Singleton",
  skipBaseClassChecks: true,
});

errorContainer.load(ErrorModule);

export { errorContainer };

const errorAdapter = errorContainer.get<IErrorAdapterFacade>(
  TOKENS.ErrorAdapterFacade,
);

export { errorAdapter };
