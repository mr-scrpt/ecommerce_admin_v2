import { OrderRepository, OrderRowRepository } from "@/entities/order/server";
import { Container, ContainerModule } from "inversify";
import { OrderRowUpdateQuantityTx } from "./_tx/orderRowUpdateQuantity.transaction";
import { ProductRepository } from "@/entities/product/server";
import { UpdateOrderRowQuantityComplexibleUseCase } from "./_usecase/orderRowUpdateQuantityComplexible.usecase";

export const orderRowUpdateContainer = new Container();

export const OrderRowUpdateModule = new ContainerModule((bind) => {
  bind(OrderRowRepository).toSelf();
  bind(OrderRepository).toSelf();
  bind(OrderRowUpdateQuantityTx).toSelf();
  bind(ProductRepository).toSelf();
  bind(UpdateOrderRowQuantityComplexibleUseCase).toSelf();
});

orderRowUpdateContainer.load(OrderRowUpdateModule);
