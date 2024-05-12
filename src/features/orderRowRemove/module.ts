import { OrderRepository, OrderRowRepository } from "@/entities/order/server";
import { Container, ContainerModule } from "inversify";
import { OrderRowRemoveTx } from "./_tx/orderRowRemove.transaction";
import { RemoveOrderRowComplexibleUseCase } from "./_usecase/orderRemoveRowComplexible.usecase";

export const orderRowRemoveContainer = new Container();

export const OrderRowRemoveModule = new ContainerModule((bind) => {
  bind(OrderRowRepository).toSelf();
  bind(OrderRepository).toSelf();
  bind(OrderRowRemoveTx).toSelf();
  bind(RemoveOrderRowComplexibleUseCase).toSelf();
});

orderRowRemoveContainer.load(OrderRowRemoveModule);
