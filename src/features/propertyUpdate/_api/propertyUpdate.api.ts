import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { PropertyUpdateController } from "../_controller/propertyUpdate.controller";

export const propertyUpdateApi =
  createApi<PropertyUpdateController["router"]>();

export const propertyUpdateHttpApi =
  createHttpApi<PropertyUpdateController["router"]>();
