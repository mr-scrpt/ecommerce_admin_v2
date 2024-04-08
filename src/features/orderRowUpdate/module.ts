import { OrderRepository, OrderRowRepository } from "@/entities/order/server";
import { DBClient, dbClient } from "@/shared/lib/db";
import { Container, ContainerModule } from "inversify";
import { OrderRowUpdateQuantityTx } from "./_tx/orderRowUpdateQuantity.transaction";
import { ProductRepository } from "@/entities/product/server";
import { UpdateOrderRowQuantityComplexibleUseCase } from "./_usecase/orderRowUpdateQuantityComplexible.usecase";

const orderRowUpdateContainer = new Container();

export const OrderRowUpdateModule = new ContainerModule((bind) => {
  bind(DBClient).toConstantValue(dbClient);
  bind(OrderRowRepository).toSelf();
  bind(OrderRepository).toSelf();
  bind(OrderRowUpdateQuantityTx).toSelf();
  bind(ProductRepository).toSelf();
  bind(UpdateOrderRowQuantityComplexibleUseCase).toSelf();
});

orderRowUpdateContainer.load(OrderRowUpdateModule);

export default orderRowUpdateContainer;
