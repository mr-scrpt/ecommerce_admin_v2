import fs from "fs/promises";
import { inject, injectable } from "inversify";
import path from "path";
import { LOGGER_INJECTION_TOKENS } from "./di";
import type {
  ILogDestination,
  ILogTransport,
  ILoggerOptions,
  ILoggerProvider,
  IRotationStrategy,
} from "./types";

@injectable()
export class FileLogTransport implements ILogTransport {
  private readonly destination: ILogDestination;
  private readonly loggerOptions: ILoggerOptions;
  private loggerInstance: any;

  constructor(
    @inject(LOGGER_INJECTION_TOKENS.RotationStrategy)
    private rotationStrategy: IRotationStrategy,
    @inject(LOGGER_INJECTION_TOKENS.LogDestination)
    destination: ILogDestination,
    @inject(LOGGER_INJECTION_TOKENS.LoggerOptions)
    options: ILoggerOptions,
    @inject(LOGGER_INJECTION_TOKENS.LoggerProvider)
    private loggerProvider: ILoggerProvider,
  ) {
    this.destination = destination;
    this.loggerOptions = options;
    this.initializeLogger();
  }

  private getFullPath(): string {
    return path.join(
      process.cwd(),
      this.destination.catalog,
      this.destination.filename,
    );
  }

  private async ensureLogDirectory(): Promise<void> {
    const dirPath = path.join(process.cwd(), this.destination.catalog);
    try {
      await fs.access(dirPath);
    } catch {
      await fs.mkdir(dirPath, { recursive: true });
    }
  }

  private async initializeLogger(): Promise<void> {
    await this.ensureLogDirectory();
    this.loggerInstance = this.loggerProvider.createLogger({
      ...this.loggerOptions,
      destination: this.getFullPath(),
    });
  }

  async write(data: string): Promise<void> {
    const shouldRotate = await this.rotationStrategy.shouldRotate(
      this.destination.filename,
    );
    if (shouldRotate) {
      await this.rotationStrategy.rotate(this.destination.filename);
      await this.initializeLogger();
    }

    // Используем info вместо write
    this.loggerInstance.info(data);
  }
}

// @injectable()
// export class FileLogTransport implements ILogTransport {
//   private readonly destination: ILogDestination;
//   private readonly loggerOptions: ILoggerOptions;
//   private loggerInstance: any; // тип зависит от конкретной реализации логгера
//
//   constructor(
//     @inject(LOGGER_INJECTION_TOKENS.RotationStrategy)
//     private rotationStrategy: IRotationStrategy,
//     @inject(LOGGER_INJECTION_TOKENS.LogDestination)
//     destination: ILogDestination,
//     @inject(LOGGER_INJECTION_TOKENS.LoggerOptions)
//     options: ILoggerOptions,
//     @inject(LOGGER_INJECTION_TOKENS.LoggerProvider)
//     private loggerProvider: ILoggerProvider,
//   ) {
//     this.destination = destination;
//     this.loggerOptions = options;
//     this.initializeLogger();
//   }
//
//   private getFullPath(): string {
//     return path.join(
//       process.cwd(),
//       this.destination.catalog,
//       this.destination.filename,
//     );
//   }
//
//   private async ensureLogDirectory(): Promise<void> {
//     const dirPath = path.join(process.cwd(), this.destination.catalog);
//     try {
//       await fs.access(dirPath);
//     } catch {
//       await fs.mkdir(dirPath, { recursive: true });
//     }
//   }
//
//   private async initializeLogger(): Promise<void> {
//     await this.ensureLogDirectory();
//     this.loggerInstance = this.loggerProvider.createLogger({
//       ...this.loggerOptions,
//       destination: this.getFullPath(),
//     });
//   }
//
//   async write(data: string): Promise<void> {
//     const shouldRotate = await this.rotationStrategy.shouldRotate(
//       this.destination.filename,
//     );
//     if (shouldRotate) {
//       await this.rotationStrategy.rotate(this.destination.filename);
//       await this.initializeLogger(); // Реинициализация после ротации
//     }
//
//     this.loggerInstance.info(data + "\n");
//   }
// }
