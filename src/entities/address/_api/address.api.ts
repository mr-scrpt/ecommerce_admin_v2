import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { AddressController } from "../_controller/address.controller";

export const addressApi = createApi<AddressController["router"]>();

export const addressHttpApi = createHttpApi<AddressController["router"]>();
