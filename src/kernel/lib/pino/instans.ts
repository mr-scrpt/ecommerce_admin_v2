import { Container } from "inversify";
import { LoggerModule } from "./module";
import { ILogger } from "@/shared/logger/logger.type";
import { LOGGER_TYPES } from "./type";

const loggerContainer = new Container();

loggerContainer.load(LoggerModule);

const logger = loggerContainer.get<ILogger>(LOGGER_TYPES.Logger);

export { logger };
