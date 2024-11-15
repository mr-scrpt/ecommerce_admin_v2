import { injectable } from "inversify";
import { z } from "zod";

const loggerConfigSchema = z.object({
  ERROR_LOG_LEVEL_ERROR: z.string(),
  ACCESS_LOG_LEVEL_INFO: z.string(),
  ERROR_LOG_DESTINATION_CATALOG: z.string(),
  ERROR_LOG_MAX_SIZE: z.string(),
  ERROR_LOG_FILENAME: z.string(),
  ACCESS_LOG_FILENAME: z.string(),
  ERROR_LOG_COLORIZE: z.string().transform((val) => val === "true"),
  ERROR_LOG_TRANSLATE_TIME: z.string(),
  ERROR_LOG_IGNORE: z.string(),
  ERROR_LOG_MESSAGE_FORMAT: z.string(),
});

export const loggerConfig = loggerConfigSchema.parse(process.env);

export type TLoggerConfig = z.infer<typeof loggerConfigSchema>;

export interface ILoggerConfig {
  ERROR_LOG_LEVEL_ERROR: string;
  ACCESS_LOG_LEVEL_INFO: string;
  ERROR_LOG_DESTINATION_CATALOG: string;
  ERROR_LOG_MAX_SIZE: string;
  ERROR_LOG_FILENAME: string;
  ACCESS_LOG_FILENAME: string;
  ERROR_LOG_COLORIZE: boolean;
  ERROR_LOG_TRANSLATE_TIME: string;
  ERROR_LOG_IGNORE: string;
  ERROR_LOG_MESSAGE_FORMAT: string;
}

@injectable()
export abstract class LoggerConfigBase implements ILoggerConfig {
  abstract ERROR_LOG_LEVEL_ERROR: string;
  abstract ACCESS_LOG_LEVEL_INFO: string;
  abstract ERROR_LOG_DESTINATION_CATALOG: string;
  abstract ERROR_LOG_MAX_SIZE: string;
  abstract ERROR_LOG_FILENAME: string;
  abstract ACCESS_LOG_FILENAME: string;
  abstract ERROR_LOG_COLORIZE: boolean;
  abstract ERROR_LOG_TRANSLATE_TIME: string;
  abstract ERROR_LOG_IGNORE: string;
  abstract ERROR_LOG_MESSAGE_FORMAT: string;
}

@injectable()
export class LoggerConfigImpl extends LoggerConfigBase {
  constructor(private config: ILoggerConfig) {
    super();
    Object.assign(this, config);
  }
  ERROR_LOG_LEVEL_ERROR = this.config.ERROR_LOG_LEVEL_ERROR;
  ACCESS_LOG_LEVEL_INFO = this.config.ACCESS_LOG_LEVEL_INFO;
  ERROR_LOG_DESTINATION_CATALOG = this.config.ERROR_LOG_DESTINATION_CATALOG;
  ERROR_LOG_MAX_SIZE = this.config.ERROR_LOG_MAX_SIZE;
  ERROR_LOG_FILENAME = this.config.ERROR_LOG_FILENAME;
  ACCESS_LOG_FILENAME = this.config.ACCESS_LOG_FILENAME;
  ERROR_LOG_COLORIZE = this.config.ERROR_LOG_COLORIZE;
  ERROR_LOG_TRANSLATE_TIME = this.config.ERROR_LOG_TRANSLATE_TIME;
  ERROR_LOG_IGNORE = this.config.ERROR_LOG_IGNORE;
  ERROR_LOG_MESSAGE_FORMAT = this.config.ERROR_LOG_MESSAGE_FORMAT;
}
