import "reflect-metadata";

import { cartContainer } from "@/entities/cart/module";
import { categoryContainer } from "@/entities/category/module";
import { deliveryContainer } from "@/entities/delivery/module";
import { dbContainer } from "@/shared/lib/db";
import { sessionContainer } from "@/shared/session/module";
import { Container } from "inversify";
import { userCreateContainer } from "@/features/userCreate/module";
import { orderContainer } from "@/entities/order/module";
import { productContainer } from "@/entities/product/module";
import { propertyContainer } from "@/entities/property/module";
import { settlementContainer } from "@/entities/settlement/module";
import { storeContainer } from "@/entities/store/module";
import { userContainer } from "@/entities/user/module";
import { cartAddContainer } from "@/features/cartRowAdd/module";
import { cartRowChangeQuantityContainer } from "@/features/cartRowChange/module";
import { cartRowRemoveContainer } from "@/features/cartRowRemove/module";
import { categoryCreateContainer } from "@/features/categoryCreate/module";
import { categoryUpdateContainer } from "@/features/categoryUpdate/module";
import { categoryRemoveContainer } from "@/features/categoryRemove/module";
import { orderCreateContainer } from "@/features/orderCreate/module";
import { orderDeliveryUpdateContainer } from "@/features/orderDeliveryUpdate/module";
import { orderOwnerDataContainer } from "@/features/orderOwnerData/module";
import { orderRowRemoveContainer } from "@/features/orderRowRemove/module";
import { orderRowUpdateContainer } from "@/features/orderRowUpdate/module";
import { orderStatusUpdateContainer } from "@/features/orderStatusUpdate/module";
import { productCreateContainer } from "@/features/productCreate/module";
import { productRemoveContainer } from "@/features/productRemove/module";
import { productUpdateContainer } from "@/features/productUpdate/module";
import { profileUpdateContainer } from "@/features/profileUpdate/module";
import { propertyUpdateContainer } from "@/features/propertyUpdate/module";
import { storeDataContainer } from "@/features/storeData/module";
import { storeRemoveContainer } from "@/features/storeRemove/module";
import { storeUpdateContainer } from "@/features/storeUpdate/module";
import { userRemoveContainer } from "@/features/userRemove/module";
import { userUpdateContainer } from "@/features/userUpdate/module";
import { orderRowAddContainer } from "@/features/orderRow/module";
import { propertyCreateContainer } from "@/features/propertyCreate/module";
import { propertyRemoveContainer } from "@/features/propertyRemove/module";

export const loadModule = () => {
  const mergeContainer = Container.merge(
    dbContainer,
    sessionContainer,
    cartContainer,
    categoryContainer,
    categoryCreateContainer,
    // deliveryContainer,
    // orderContainer,
    // productContainer,
    // propertyContainer,
    // settlementContainer,
    // storeContainer,
    // userContainer,

    // cartAddContainer,
    // cartRowChangeQuantityContainer,
    // cartRowRemoveContainer,
    // categoryCreateContainer,
    // categoryUpdateContainer,
    // categoryRemoveContainer,
    // orderCreateContainer,
    // orderDeliveryUpdateContainer,
    // orderOwnerDataContainer,
    // orderRowAddContainer,
    // orderRowRemoveContainer,
    // orderRowUpdateContainer,
    // orderStatusUpdateContainer,
    // productCreateContainer,
    // productRemoveContainer,
    // productUpdateContainer,
    // profileUpdateContainer,
    // propertyCreateContainer,
    // propertyRemoveContainer,
    // propertyUpdateContainer,
    // storeDataContainer,
    // storeRemoveContainer,
    // storeUpdateContainer,
    userCreateContainer,
    // userRemoveContainer,
    // userUpdateContainer,
  );

  // const conf = mergeContainer.get(NextAuthConfig).options
  return mergeContainer;

  // container.load(
  //   DbModule,
  //   NextAuthModule,
  //   UserModule,
  //   UserCreateModule,
  //   CartModule,
  //   CategoryModule,
  //   DeliveryModule,
  //   OrderModule,
  //   ProductModule,
  //   PropertyModule,
  //   SettlementModule,
  //   StoreModule,
  // );
  //
  // return container;
};

export const initModule = loadModule();
