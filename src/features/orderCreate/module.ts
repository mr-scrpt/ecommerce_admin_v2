import { OrderRepository } from "@/entities/order/server";
import { Container, ContainerModule } from "inversify";
import { OrderCreateTx } from "./_tx/orderCreate.transaction";
import { CreateOrderComplexibleUseCase } from "./_usecase/orderCreateCopmlexible.usecase";

export const orderCreateContainer = new Container();

export const OrderCreateModule = new ContainerModule((bind) => {
  bind(OrderCreateTx).toSelf();
  bind(OrderRepository).toSelf();

  bind(CreateOrderComplexibleUseCase).toSelf();
});

orderCreateContainer.load(OrderCreateModule);
