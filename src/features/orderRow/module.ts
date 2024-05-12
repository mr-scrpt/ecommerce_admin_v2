import { OrderRepository, OrderRowRepository } from "@/entities/order/server";
import { ProductRepository } from "@/entities/product/server";
import { Container, ContainerModule } from "inversify";
import { OrderRowAddTx } from "./_tx/orderRowAdd.transaction";
import { AddOrderRowComplexibleUseCase } from "./_usecase/orderAddRowComplexible.usecase";

export const orderRowAddContainer = new Container();

export const OrderRowAddModule = new ContainerModule((bind) => {
  bind(OrderRowAddTx).toSelf();
  bind(OrderRepository).toSelf();
  bind(OrderRowRepository).toSelf();
  bind(ProductRepository).toSelf();
  bind(AddOrderRowComplexibleUseCase).toSelf();
});

orderRowAddContainer.load(OrderRowAddModule);
