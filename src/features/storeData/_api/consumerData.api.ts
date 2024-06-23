import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { ConsumerDataCreateController } from "../_controller/consumerData.controller";

export const consumerDataApi =
  createApi<ConsumerDataCreateController["router"]>();

export const consumerDataHttpApi =
  createHttpApi<ConsumerDataCreateController["router"]>();
