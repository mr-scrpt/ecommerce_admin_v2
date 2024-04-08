import { OrderRepository, OrderRowRepository } from "@/entities/order/server";
import { DBClient, dbClient } from "@/shared/lib/db";
import { Container, ContainerModule } from "inversify";
import { OrderCreateTx } from "./_tx/orderCreate.transaction";
import { CreateOrderComplexibleUseCase } from "./_usecase/orderCreateCopmlexible.usecase";

const orderCreateContainer = new Container();

export const OrderCreateModule = new ContainerModule((bind) => {
  bind(DBClient).toConstantValue(dbClient);
  bind(OrderCreateTx).toSelf();
  bind(OrderRepository).toSelf();
  bind(OrderRowRepository).toSelf();

  bind(CreateOrderComplexibleUseCase).toSelf();
});

orderCreateContainer.load(OrderCreateModule);

export default orderCreateContainer;
