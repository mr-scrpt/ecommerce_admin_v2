import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { OrderUpdateController } from "../_controller/orderUpdate.controller";

export const orderUpdateApi = createApi<OrderUpdateController["router"]>();

export const orderUpdateHttpApi =
  createHttpApi<OrderUpdateController["router"]>();
