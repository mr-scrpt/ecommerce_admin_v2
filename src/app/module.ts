import "reflect-metadata";

import { NextAuthModule } from "@/kernel/lib/nextauth/module";
import { DbModule } from "@/shared/lib/db";
import { Container } from "inversify";

export const loadModule = () => {
  const container = new Container();

  container.load(DbModule, NextAuthModule);
  return container;
};

export const appModule = loadModule();
