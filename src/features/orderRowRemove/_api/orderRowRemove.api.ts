import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { OrderRowRemoveController } from "../_controller/orderRowRemove.controller";

export const orderRowRemoveApi =
  createApi<OrderRowRemoveController["router"]>();

export const orderRowRemoveHttpApi =
  createHttpApi<OrderRowRemoveController["router"]>();
