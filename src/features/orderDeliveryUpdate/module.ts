import { Container, ContainerModule } from "inversify";
import { OrderDeliveryUpdateTx } from "./_tx/orderDeliveryUpdate.transaction";
import { DeliveryRepository } from "@/entities/delivery/server";
import { OrderUpdateDeliveryUseCase } from "./_useCase/orderUpdateDelivery.usecase";

export const orderDeliveryUpdateContainer = new Container();

export const OrderDeliveryUpdateModule = new ContainerModule((bind) => {
  bind(OrderDeliveryUpdateTx).toSelf();
  bind(DeliveryRepository).toSelf();
  bind(OrderUpdateDeliveryUseCase).toSelf();
});

orderDeliveryUpdateContainer.load(OrderDeliveryUpdateModule);
