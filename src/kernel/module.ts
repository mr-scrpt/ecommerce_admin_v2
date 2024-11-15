import { ConfigModule } from "@/shared/config/module";
import { Container } from "inversify";
import { LoggerModule } from "./logger_v2/module";

export const loadInfrastructureModule = () => {
  console.log("output_log: LOAD INFRASTRUCTURE MODULE INIT =>>>");
  const container = new Container();

  container.load(ConfigModule, LoggerModule);

  return container;
};

export const infrastructureModule = loadInfrastructureModule();
