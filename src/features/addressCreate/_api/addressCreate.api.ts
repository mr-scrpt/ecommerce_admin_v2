import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { AddressCreateController } from "../_controller/addressCreate.controller";

export const addressCreateApi = createApi<AddressCreateController["router"]>();

export const addressCreateHttpApi =
  createHttpApi<AddressCreateController["router"]>();
