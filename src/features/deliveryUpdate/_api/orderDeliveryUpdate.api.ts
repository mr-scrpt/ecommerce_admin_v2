import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { DeliveryUpdateController } from "../_controller/deliveryUpdate.controller";

export const deliveryUpdateApi =
  createApi<DeliveryUpdateController["router"]>();

export const deliveryUpdateHttpApi =
  createHttpApi<DeliveryUpdateController["router"]>();
