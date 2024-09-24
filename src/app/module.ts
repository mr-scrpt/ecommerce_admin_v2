import "reflect-metadata";

import { CartModule } from "@/entities/cart/module";
import { CategoryModule } from "@/entities/category/module";
import { ConsumerModule } from "@/entities/consumer/module";
import { DeliveryModule } from "@/entities/delivery/module";
import {
  OrderModule,
  OrderRowModule,
  OrderStatusModule,
} from "@/entities/order/module";
import { PostModule } from "@/entities/post/module";
import { ProductModule } from "@/entities/product/module";
import { ProfileModule } from "@/entities/profile/module";
import { PropertyItemModule, PropertyModule } from "@/entities/property/module";
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

// import { OrderRowCreateModule } from "@/features/__orderRowCreate/module";
import { OrderRowRemoveModule } from "@/features/orderRowRemove/module";
import { OrderRowUpdateModule } from "@/features/orderRowUpdate/module";

import { AddressModule } from "@/entities/address/module";
import { ReceiverModule } from "@/entities/receiver/module";
import { StaffModule } from "@/entities/staff/module";
import { AddressCreateModule } from "@/features/addressCreate/module";
import { ConsumerCreateModule } from "@/features/consumerCreate/module";
import { ConsumerRemoveModule } from "@/features/consumerRemove/module";
import { ConsumerUpdateModule } from "@/features/consumerUpdate/module";
import { OrderUpdateModule } from "@/features/orderUpdate/module";
import { ProductCreateModule } from "@/features/productCreate/module";
import { ProductRemoveModule } from "@/features/productRemove/module";
import { ProductUpdateModule } from "@/features/productUpdate/module";
import { ProfileUpdateModule } from "@/features/profileUpdate/module";
import { PropertyCreateModule } from "@/features/propertyCreate/module";
import { PropertyRemoveModule } from "@/features/propertyRemove/module";
import { PropertyUpdateModule } from "@/features/propertyUpdate/module";
import { ReceiverCreateModule } from "@/features/receiverCreate/module";
import { SessionCreateModule } from "@/features/sessionGet/module";
import { StaffRemoveModule } from "@/features/staffRemove/module";
import { StaffUpdateModule } from "@/features/staffUpdate/module";
import { StoreCreateModule } from "@/features/storeCreate/module";
import { StoreRemoveModule } from "@/features/storeRemove/module";
import { StoreUpdateModule } from "@/features/storeUpdate/module";
import { UserCreateModule } from "@/features/userCreate/module";
import { UserUpdateModule } from "@/features/userUpdate/module";
import { NextAuthModule } from "@/kernel/lib/nextauth/module";
import { NovaPoshtaModule } from "@/kernel/lib/novaposhta/module";
import { TrpcModule } from "@/kernel/lib/trpc/module";
import { HttpClientModule } from "@/shared/api/module";
import { DbModule } from "@/shared/lib/db/module";
import { Container } from "inversify";
import { OrderRowCreateModule } from "@/features/orderRowCreate/module";
import { OrderReceiverUpdateModule } from "@/features/orderReceiverUpdate/module";

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
    OrderStatusModule,

    OrderRowModule,
    OrderRowCreateModule,
    OrderRowUpdateModule,
    OrderRowRemoveModule,

    OrderDeliveryUpdateModule,
    OrderReceiverUpdateModule,

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

    PropertyItemModule,

    StoreModule,
    StoreCreateModule,
    StoreRemoveModule,
    StoreUpdateModule,

    SettlementModule,
    TrpcModule,
  );
  return container;
};

export const appModule = loadModule();
