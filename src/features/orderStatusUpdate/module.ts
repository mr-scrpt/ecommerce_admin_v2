import { OrderRepository } from "@/entities/order/server";
import { DBClient, dbClient } from "@/shared/lib/db";
import { Container, ContainerModule } from "inversify";
import { UpdateOrderStatusComplexibleUseCase } from "./_usecase/orderStatusUpdateComplexible.usecase";
import { OrderUpdateStatusTx } from "./_tx/orderStatusUpdate.transaction";

const orderStatusUpdateContainer = new Container();

export const OrderStatusUpdateModule = new ContainerModule((bind) => {
  bind(DBClient).toConstantValue(dbClient);
  bind(OrderRepository).toSelf();
  bind(OrderUpdateStatusTx).toSelf();
  bind(UpdateOrderStatusComplexibleUseCase).toSelf();
});

orderStatusUpdateContainer.load(OrderStatusUpdateModule);

export default orderStatusUpdateContainer;
