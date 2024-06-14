import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { PropertyCreateController } from "../_controller/propertyCreate.controller";

export const propertyCreateApi =
  createApi<PropertyCreateController["router"]>();

export const propertyCreateHttpApi =
  createHttpApi<PropertyCreateController["router"]>();
