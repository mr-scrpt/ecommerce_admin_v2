import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { OrderRowCreateController } from "../_controller/orderRowCreate.controller";

export const orderRowCreateApi =
  createApi<OrderRowCreateController["router"]>();

export const orderRowCreateHttpApi =
  createHttpApi<OrderRowCreateController["router"]>();
