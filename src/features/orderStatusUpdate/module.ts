import { OrderRepository } from "@/entities/order/server";
import { Container, ContainerModule } from "inversify";
import { UpdateOrderStatusComplexibleUseCase } from "./_usecase/orderStatusUpdateComplexible.usecase";
import { OrderUpdateStatusTx } from "./_tx/orderStatusUpdate.transaction";

export const orderStatusUpdateContainer = new Container();

export const OrderStatusUpdateModule = new ContainerModule((bind) => {
  bind(OrderRepository).toSelf();
  bind(OrderUpdateStatusTx).toSelf();
  bind(UpdateOrderStatusComplexibleUseCase).toSelf();
});

orderStatusUpdateContainer.load(OrderStatusUpdateModule);
