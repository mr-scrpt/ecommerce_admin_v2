import { OrderRepository, OrderRowRepository } from "@/entities/order/server";
import { DBClient, dbClient } from "@/shared/lib/db";
import { Container, ContainerModule } from "inversify";
import { OrderRowRemoveTx } from "./_tx/orderRowRemove.transaction";
import { RemoveOrderRowComplexibleUseCase } from "./_usecase/orderRemoveRowComplexible.usecase";

const orderRowRemoveContainer = new Container();

export const OrderRowRemoveModule = new ContainerModule((bind) => {
  bind(DBClient).toConstantValue(dbClient);
  bind(OrderRowRepository).toSelf();
  bind(OrderRepository).toSelf();
  bind(OrderRowRemoveTx).toSelf();
  bind(RemoveOrderRowComplexibleUseCase).toSelf();
});

orderRowRemoveContainer.load(OrderRowRemoveModule);

export default orderRowRemoveContainer;
