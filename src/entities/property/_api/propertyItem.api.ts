import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { PropertyItemController } from "../_controller/propertyItem.controller";

export const propertyItemApi = createApi<PropertyItemController["router"]>();

export const propertyItemHttpApi =
  createHttpApi<PropertyItemController["router"]>();
