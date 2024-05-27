import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { PropertyController } from "../_controller/property.controller";

export const propertyApi = createApi<PropertyController["router"]>();

export const propertyHttpApi = createHttpApi<PropertyController["router"]>();
