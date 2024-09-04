import {
  IDeliveryRepository,
  IDeliveryTypeRepository,
} from "@/kernel/domain/delivery/repository.type";
import { Controller } from "@/kernel/lib/trpc/server";
import { ContainerModule } from "inversify";
import { DeliveryController } from "./_controller/delivery.controller";
import { DeliveryRepository } from "./_repository/delivery.repo";
import { DeliveryGetService } from "./_service/deliveryGet.service";
import { DeliveryGetByOrderService } from "./_service/deliveryGetByOrder.service";
import { DeliveryGetWithRelationByOrderService } from "./_service/deliveryGetWithRelationByOrder.service";
import { DeliveryListGetService } from "./_service/deliveryListGet.service";
import { DeliveryTypeListGetService } from "./_service/deliveryTypeListGet.service";
import { DeliveryTypeRepository } from "./_repository/deliveryType.repo";
import { DeliveryTypeAvailableListGetService } from "./_service/deliveryTypeAvailableListGet.service";

export const DeliveryModule = new ContainerModule((bind) => {
  bind(IDeliveryRepository).to(DeliveryRepository);
  bind(IDeliveryTypeRepository).to(DeliveryTypeRepository);

  bind(DeliveryGetService).toSelf();
  bind(DeliveryGetByOrderService).toSelf();
  bind(DeliveryGetWithRelationByOrderService).toSelf();
  bind(DeliveryListGetService).toSelf();
  bind(DeliveryTypeListGetService).toSelf();
  bind(DeliveryTypeAvailableListGetService).toSelf();

  bind(Controller).to(DeliveryController);
});
