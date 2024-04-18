import { DBClient, dbClient } from "@/shared/lib/db";
import { Container, ContainerModule } from "inversify";
import { DeliveryRepository } from "./_repository/delivery.repo";
import { GetDeliveryUseCase } from "./_usecase/getDelivery.usecase";
import { GetDeliveryListUseCase } from "./_usecase/getDeliveryList.usecase";
import { GetDeliveryByOrderIdUseCase } from "./_usecase/getDeliveryOrderId.usecase";

const deliveryContainer = new Container();

export const DeliveryModule = new ContainerModule((bind) => {
  bind(DBClient).toConstantValue(dbClient);

  bind(DeliveryRepository).toSelf();

  bind(GetDeliveryListUseCase).toSelf();
  bind(GetDeliveryUseCase).toSelf();
  bind(GetDeliveryByOrderIdUseCase).toSelf();
});

deliveryContainer.load(DeliveryModule);

export default deliveryContainer;
