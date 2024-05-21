import "reflect-metadata";

import { NextAuthModule } from "@/kernel/lib/nextauth/module";
import { DbModule } from "@/shared/lib/db";
import { Container } from "inversify";
import { CategoryModule } from "@/entities/category/module";

export const loadModule = () => {
  const container = new Container();

  container.load(DbModule, NextAuthModule, CategoryModule);
  return container;
};

export const appModule = loadModule();
