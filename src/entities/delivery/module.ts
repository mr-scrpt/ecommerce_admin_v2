import { Controller } from "@/kernel/lib/trpc/server";
import { ContainerModule } from "inversify";
import { DeliveryController } from "./_controller/delivery.controller";
import { DeliveryRepository } from "./_repository/delivery.repo";
import { DeliveryGetService } from "./_service/deliveryGet.service";
import { DeliveryGetByOrderService } from "./_service/deliveryGetByOrder.service";
import { DeliveryListGetService } from "./_service/deliveryListGet.service";
import { IDeliveryRepository } from "./_domain/repository.type";

export const DeliveryModule = new ContainerModule((bind) => {
  bind(IDeliveryRepository).to(DeliveryRepository);

  bind(DeliveryGetService).toSelf();
  bind(DeliveryGetByOrderService).toSelf();
  bind(DeliveryListGetService).toSelf();

  bind(Controller).to(DeliveryController);
});
