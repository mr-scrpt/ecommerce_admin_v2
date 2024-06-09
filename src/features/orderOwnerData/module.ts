import { OrderRepository } from "@/entities/order/server";
import { ContainerModule } from "inversify";
import { OrderOwnerDataTx } from "./_tx/orderOwnerData.transaction";
import { GetOrderOwnerDataComplexibleUseCase } from "./_useCase/getOrderOwnerDataComplexible.usecase";

export const OrderOwnerDataModule = new ContainerModule((bind) => {
  bind(OrderRepository).toSelf();
  bind(OrderOwnerDataTx).toSelf();

  bind(GetOrderOwnerDataComplexibleUseCase).toSelf();
});
