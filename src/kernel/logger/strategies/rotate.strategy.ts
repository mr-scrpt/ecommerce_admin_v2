"use server";
import type { ILoggerConfig } from "@/shared/config/logger.config";
import { inject, injectable } from "inversify";
import { LOGGER_INJECTION_TOKENS } from "../di";
import { IRotationStrategy } from "../types";
import { FileSystemUtils } from "../utils";

@injectable()
export class SizeBasedRotationStrategy implements IRotationStrategy {
  private readonly maxSize: number = 10 * 1024 * 1024;
  private readonly logDirectory: string;

  constructor(
    @inject(LOGGER_INJECTION_TOKENS.LoggerConfig)
    config: ILoggerConfig,
  ) {
    this.logDirectory = config.ERROR_LOG_DESTINATION_CATALOG;
  }

  async shouldRotate(filename: string): Promise<boolean> {
    const filePath = FileSystemUtils.getLogFilePath(
      this.logDirectory,
      filename,
    );
    return false;

    // try {
    //   const stats = await FileSystemUtils.getFileStats(filePath);
    //   return stats.size >= this.maxSize;
    // } catch (error) {
    //   if ((error as NodeJS.ErrnoException).code === "ENOENT") {
    //     await FileSystemUtils.ensureDirectory(this.logDirectory);
    //     await FileSystemUtils.writeEmptyFile(filePath);
    //     return false;
    //   }
    //   throw error;
    // }
  }

  async rotate(filename: string): Promise<void> {
    const filePath = FileSystemUtils.getLogFilePath(
      this.logDirectory,
      filename,
    );
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const newPath = `${filePath}.${timestamp}`;

    try {
      await FileSystemUtils.ensureDirectory(this.logDirectory);

      if (await FileSystemUtils.checkFileExists(filePath)) {
        await FileSystemUtils.renameFile(filePath, newPath);
      }

      await FileSystemUtils.writeEmptyFile(filePath);
    } catch (error) {
      console.error("Error during log rotation:", error);
      throw error;
    }
  }
}
