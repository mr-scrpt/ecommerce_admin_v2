import { DBClient, dbClient } from "@/shared/lib/db";
import { Container, ContainerModule } from "inversify";
import { OrderDeliveryUpdateTx } from "./_tx/orderDeliveryUpdate.transaction";
import { DeliveryRepository } from "@/entities/delivery/server";
import { OrderUpdateDeliveryUseCase } from "./_useCase/orderUpdateDelivery.usecase";

const orderDeliveryUpdateContainer = new Container();

export const OrderDeliveryUpdateModule = new ContainerModule((bind) => {
  bind(DBClient).toConstantValue(dbClient);
  bind(OrderDeliveryUpdateTx).toSelf();
  bind(DeliveryRepository).toSelf();
  bind(OrderUpdateDeliveryUseCase).toSelf();
});

orderDeliveryUpdateContainer.load(OrderDeliveryUpdateModule);

export default orderDeliveryUpdateContainer;
