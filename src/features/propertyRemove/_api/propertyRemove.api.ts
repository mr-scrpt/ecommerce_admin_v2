import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { PropertyRemoveController } from "../_controller/propertyRemove.controller";

export const propertyRemoveApi =
  createApi<PropertyRemoveController["router"]>();

export const propertyRemoveHttpApi =
  createHttpApi<PropertyRemoveController["router"]>();
