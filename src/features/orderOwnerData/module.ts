import { DBClient, dbClient } from "@/shared/lib/db";
import { Container, ContainerModule } from "inversify";
import { OrderOwnerDataTx } from "./_tx/orderOwnerData.transaction";
import { OrderRepository } from "@/entities/order/server";
import { GetOrderOwnerDataComplexibleUseCase } from "./_useCase/getOrderOwnerDataComplexible.usecase";
import { UserRepository } from "@/entities/user/user.server";

const orderOwnerDataContainer = new Container();

export const OrderOwnerDataModule = new ContainerModule((bind) => {
  bind(DBClient).toConstantValue(dbClient);
  bind(UserRepository).toSelf();
  bind(OrderRepository).toSelf();
  bind(OrderOwnerDataTx).toSelf();

  bind(GetOrderOwnerDataComplexibleUseCase).toSelf();
});

orderOwnerDataContainer.load(OrderOwnerDataModule);

export default orderOwnerDataContainer;
