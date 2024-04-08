import { OrderRepository, OrderRowRepository } from "@/entities/order/server";
import { ProductRepository } from "@/entities/product/server";
import { DBClient, dbClient } from "@/shared/lib/db";
import { Container, ContainerModule } from "inversify";
import { OrderRowAddTx } from "./_tx/orderRowAdd.transaction";
import { AddOrderRowComplexibleUseCase } from "./_usecase/orderAddRowComplexible.usecase";

const orderRowAddContainer = new Container();

export const OrderRowAddModule = new ContainerModule((bind) => {
  bind(DBClient).toConstantValue(dbClient);
  bind(OrderRowAddTx).toSelf();
  bind(OrderRepository).toSelf();
  bind(OrderRowRepository).toSelf();
  bind(ProductRepository).toSelf();
  bind(AddOrderRowComplexibleUseCase).toSelf();
});

orderRowAddContainer.load(OrderRowAddModule);

export default orderRowAddContainer;
