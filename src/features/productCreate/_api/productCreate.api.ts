import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { ProductCreateController } from "../_controller/productCreate.controller";

export const productCreateApi = createApi<ProductCreateController["router"]>();

export const productCreateHttpApi =
  createHttpApi<ProductCreateController["router"]>();
