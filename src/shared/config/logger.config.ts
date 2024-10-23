import { z } from "zod";

const loggerConfigSchema = z.object({
  ERROR_LOG_LEVEL_ERROR: z.string(),
  ACCESS_LOG_LEVEL_INFO: z.string(),
  ERROR_LOG_DESTINATION_ERROR: z.string(),
  ACCESS_LOG_DESTINATION: z.string(),
  ERROR_LOG_COLORIZE: z.string().transform((val) => val === "true"),
  ERROR_LOG_TRANSLATE_TIME: z.string(),
  ERROR_LOG_IGNORE: z.string(),
  ERROR_LOG_MESSAGE_FORMAT: z.string(),
});

export const loggerConfig = loggerConfigSchema.parse(process.env);

export type ILoggerConfig = z.infer<typeof loggerConfigSchema>;
