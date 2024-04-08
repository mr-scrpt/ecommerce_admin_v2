import { DBClient, dbClient } from "@/shared/lib/db";
import { Container, ContainerModule } from "inversify";
import { OrderRepository, OrderRowRepository } from "./server";
import { GetOrderListUseCase } from "./_usecase/getOrderList.usecase";
import { GetOrderOwnerUseCase } from "./_usecase/getOrderOwner.usecase";
import { GetOrderStatusGroupUseCase } from "./_usecase/getOrderStatusGroup.usecase";
import { GetOrderWithRelationUseCase } from "./_usecase/getOrderWithRelation.usecase";

const orderContainer = new Container();

export const OrderModule = new ContainerModule((bind) => {
  bind(DBClient).toConstantValue(dbClient);
  bind(OrderRepository).toSelf();
  bind(OrderRowRepository).toSelf();
  bind(GetOrderListUseCase).toSelf();
  bind(GetOrderOwnerUseCase).toSelf();
  bind(GetOrderStatusGroupUseCase).toSelf();
  bind(GetOrderWithRelationUseCase).toSelf();
});

orderContainer.load(OrderModule);

export default orderContainer;
