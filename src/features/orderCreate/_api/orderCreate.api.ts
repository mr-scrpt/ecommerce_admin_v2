import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { OrderCreateController } from "../_controller/orderCreate.controller";

export const orderCreateApi = createApi<OrderCreateController["router"]>();

export const orderCreateHttpApi =
  createHttpApi<OrderCreateController["router"]>();
