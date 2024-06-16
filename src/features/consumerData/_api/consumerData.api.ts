import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { ConsumerDataCreateController } from "../_controller/consumerData.controller";

export const consumerDataCreateApi =
  createApi<ConsumerDataCreateController["router"]>();

export const consumerDataCreateHttpApi =
  createHttpApi<ConsumerDataCreateController["router"]>();
