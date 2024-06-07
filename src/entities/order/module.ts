import { Container, ContainerModule } from "inversify";
import { OrderRepository } from "./_repository/order.repo";
import { OrderRowRepository } from "./_repository/orderRow.repo";
import { OrderGetService } from "./_service/orderGet.service";
import { OrderController } from "./_controller/order.controller";
import { Controller } from "@/kernel/lib/trpc/_controller";

export const orderContainer = new Container();

export const OrderModule = new ContainerModule((bind) => {
  bind(OrderRepository).toSelf();
  bind(OrderRowRepository).toSelf();
  bind(OrderGetService).toSelf();

  bind(Controller).to(OrderController);
});

orderContainer.load(OrderModule);
