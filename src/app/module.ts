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
import { PropertyModule } from "@/entities/property/module";
import { CategoryUpdateModule } from "@/features/categoryUpdate/module";
import { CategoryCreateModule } from "@/features/categoryCreate/module";
import { SettlementModule } from "@/entities/settlement/module";
import { SessionCreateModule } from "@/features/sessionGet/module";
import { CartRowAddModule } from "@/features/cartRowCreate/module";
import { CartRowUpdateModule } from "@/features/cartRowUpdate/module";
import { CartRowRemoveModule } from "@/features/cartRowRemove/module";
import { DeliveryModule } from "@/entities/delivery/module";
import { HttpClientModule } from "@/shared/api/module";
import { NovaPoshtaModule } from "@/kernel/lib/novaposhta/module";
import { PostModule } from "@/entities/post/module";
import { OrderModule } from "@/entities/order/module";
import { OrderCreateModule } from "@/features/orderCreate/module";
import { OrderDeliveryUpdateModule } from "@/features/deliveryUpdate/module";
import { ProductModule } from "@/entities/product/module";
import { ProductCreateModule } from "@/features/productCreate/module";

export const loadModule = () => {
  const container = new Container();

  container.load(
    DbModule,
    NextAuthModule,
    SessionCreateModule,
    HttpClientModule,
    NovaPoshtaModule,

    UserModule,
    UserCreateModule,

    ProfileModule,
    ProfileUpdateModule,

    CartModule,
    CartRowAddModule,
    CartRowRemoveModule,
    CartRowUpdateModule,

    OrderModule,
    OrderCreateModule,
    OrderDeliveryUpdateModule,

    CategoryModule,
    CategoryCreateModule,
    CategoryUpdateModule,
    CategoryRemoveModule,

    ProductModule,
    ProductCreateModule,

    DeliveryModule,
    PostModule,

    PropertyModule,

    SettlementModule,
    TrpcModule,
  );
  return container;
};

export const appModule = loadModule();
