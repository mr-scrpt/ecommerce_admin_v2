import "reflect-metadata";

import { CartModule } from "@/entities/cart/module";
import { CategoryModule } from "@/entities/category/module";
import { ConsumerModule } from "@/entities/consumer/module";
import { DeliveryModule } from "@/entities/delivery/module";
import { OrderModule } from "@/entities/order/module";
import { PostModule } from "@/entities/post/module";
import { ProductModule } from "@/entities/product/module";
import { ProfileModule } from "@/entities/profile/module";
import { PropertyModule } from "@/entities/property/module";
import { SettlementModule } from "@/entities/settlement/module";
import { StoreModule } from "@/entities/store/module";
import { UserModule } from "@/entities/user/module";
import { CartRowAddModule } from "@/features/cartRowCreate/module";
import { CartRowRemoveModule } from "@/features/cartRowRemove/module";
import { CartRowUpdateModule } from "@/features/cartRowUpdate/module";
import { CategoryCreateModule } from "@/features/categoryCreate/module";
import { CategoryRemoveModule } from "@/features/categoryRemove/module";
import { CategoryUpdateModule } from "@/features/categoryUpdate/module";
import { OrderDeliveryUpdateModule } from "@/features/deliveryUpdate/module";
import { OrderCreateModule } from "@/features/orderCreate/module";

import { OrderRowUpdateModule } from "@/features/orderRowUpdate/module";
import { OrderRowCreateModule } from "@/features/orderRowCreate/module";
import { OrderRowRemoveModule } from "@/features/orderRowRemove/module";

import { OrderUpdateModule } from "@/features/orderUpdate/module";
import { ProductCreateModule } from "@/features/productCreate/module";
import { ProductRemoveModule } from "@/features/productRemove/module";
import { ProductUpdateModule } from "@/features/productUpdate/module";
import { ProfileUpdateModule } from "@/features/profileUpdate/module";
import { PropertyCreateModule } from "@/features/propertyCreate/module";
import { PropertyRemoveModule } from "@/features/propertyRemove/module";
import { PropertyUpdateModule } from "@/features/propertyUpdate/module";
import { SessionCreateModule } from "@/features/sessionGet/module";
import { ConsumerCreateModule } from "@/features/consumerCreate/module";
import { UserUpdateModule } from "@/features/userUpdate/module";
import { NextAuthModule } from "@/kernel/lib/nextauth/module";
import { NovaPoshtaModule } from "@/kernel/lib/novaposhta/module";
import { TrpcModule } from "@/kernel/lib/trpc/module";
import { HttpClientModule } from "@/shared/api/module";
import { DbModule } from "@/shared/lib/db/module";
import { Container } from "inversify";
import { UserCreateModule } from "@/features/userCreate/module";
import { ConsumerRemoveModule } from "@/features/consumerRemove/module";
import { ConsumerUpdateModule } from "@/features/consumerUpdate/module";
import { StoreRemoveModule } from "@/features/storeRemove/module";
import { StoreCreateModule } from "@/features/storeCreate/module";
import { AddressModule } from "@/entities/address/module";
import { AddressCreateModule } from "@/features/addressCreate/module";
import { ReceiverModule } from "@/entities/receiver/module";
import { ReceiverCreateModule } from "@/features/receiverCreate/module";
import { StaffModule } from "@/entities/staff/module";
import { StaffUpdateModule } from "@/features/staffUpdate/module";
import { StaffRemoveModule } from "@/features/staffRemove/module";

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
    UserUpdateModule,

    ConsumerModule,
    ConsumerCreateModule,
    ConsumerRemoveModule,
    ConsumerUpdateModule,

    StaffModule,
    StaffRemoveModule,
    StaffUpdateModule,

    ProfileModule,
    ProfileUpdateModule,

    ReceiverModule,
    ReceiverCreateModule,

    CartModule,
    CartRowAddModule,
    CartRowRemoveModule,
    CartRowUpdateModule,

    OrderModule,
    OrderCreateModule,
    OrderUpdateModule,

    OrderDeliveryUpdateModule,

    OrderRowUpdateModule,
    OrderRowCreateModule,
    OrderRowRemoveModule,

    CategoryModule,
    CategoryCreateModule,
    CategoryUpdateModule,
    CategoryRemoveModule,

    ProductModule,
    ProductCreateModule,
    ProductUpdateModule,
    ProductRemoveModule,

    DeliveryModule,
    PostModule,
    AddressModule,
    AddressCreateModule,

    PropertyModule,
    PropertyCreateModule,
    PropertyUpdateModule,
    PropertyRemoveModule,

    StoreModule,
    StoreCreateModule,
    StoreRemoveModule,

    SettlementModule,
    TrpcModule,
  );
  return container;
};

export const appModule = loadModule();
