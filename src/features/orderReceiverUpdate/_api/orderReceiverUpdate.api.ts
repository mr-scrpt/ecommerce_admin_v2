import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { OrderReceiverUpdateController } from "../_controller/orderReceiverUpdate.controller";

export const orderReceiverUpdateApi =
  createApi<OrderReceiverUpdateController["router"]>();

export const orderReceiverUpdateHttpApi =
  createHttpApi<OrderReceiverUpdateController["router"]>();
