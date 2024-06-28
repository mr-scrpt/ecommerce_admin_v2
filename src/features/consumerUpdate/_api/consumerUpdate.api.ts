import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { ConsumerUpdateController } from "../_controller/consumerUpdate.controller";

export const consumerUpdateApi =
  createApi<ConsumerUpdateController["router"]>();

export const consumerUpdateHttpApi =
  createHttpApi<ConsumerUpdateController["router"]>();
