import "reflect-metadata";

import { CartModule } from "@/entities/cart/module";
import { CategoryModule } from "@/entities/category/module";
import { ProfileModule, UserModule } from "@/entities/user/module";
import { CategoryRemoveModule } from "@/features/categoryRemove/module";
import { ProfileUpdateModule } from "@/features/profileUpdate/module";
import { UserCreateModule } from "@/features/userCreate/module";
import { NextAuthModule } from "@/kernel/lib/nextauth/module";
import { TrpcModule } from "@/kernel/lib/trpc/module";
import { Container } from "inversify";
import { DbModule } from "@/shared/lib/db/module";

export const loadModule = () => {
  const container = new Container();

  container.load(
    DbModule,
    NextAuthModule,
    UserModule,
    UserCreateModule,
    ProfileModule,
    ProfileUpdateModule,
    CategoryModule,
    CategoryRemoveModule,
    TrpcModule,
    CartModule,
  );
  return container;
};

export const appModule = loadModule();
