import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { OrderRowUpdateController } from "../_controller/orderRowUpdate.controller";

export const orderRowUpdateApi =
  createApi<OrderRowUpdateController["router"]>();

export const orderRowUpdateHttpApi =
  createHttpApi<OrderRowUpdateController["router"]>();
