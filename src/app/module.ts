import "reflect-metadata";

import { NextAuthModule } from "@/kernel/lib/nextauth/module";
import { DbModule } from "@/shared/lib/db";
import { Container, ContainerModule } from "inversify";
import { CategoryModule } from "@/entities/category/module";
import { Controller, TrpcModule } from "@/kernel/lib/trpc/module";

// const ControllerModule = new ContainerModule((bind) => {
//   bind(Controller).toSelf();
// });
//
export const loadModule = () => {
  const container = new Container();

  container.load(DbModule, NextAuthModule, TrpcModule, CategoryModule);
  return container;
};

export const appModule = loadModule();

console.log("output_log: appModule =>>>", appModule);
