import { Controller } from "@/kernel/lib/trpc/_controller";
import { ContainerModule } from "inversify";
import { OrderController } from "./_controller/order.controller";
import { OrderRepository } from "./_repository/order.repo";
import { OrderRowRepository } from "./_repository/orderRow.repo";
import { OrderGetService } from "./_service/orderGet.service";
import { OrderRelationGetService } from "./_service/orderRelationGet.service";
import { OrderListGetByOwnerService } from "./_service/orderListGetByOwner.service";
import { OrderListGetService } from "./_service/orderListGet.service";

export const OrderModule = new ContainerModule((bind) => {
  bind(OrderRepository).toSelf();
  bind(OrderRowRepository).toSelf();
  bind(OrderGetService).toSelf();
  bind(OrderRelationGetService).toSelf();
  bind(OrderListGetByOwnerService).toSelf();
  bind(OrderListGetService).toSelf();

  bind(Controller).to(OrderController);
});
