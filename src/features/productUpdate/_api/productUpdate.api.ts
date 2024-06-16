import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { ProductUpdateController } from "../_controller/productUpdate.controller";

export const productUpdateApi = createApi<ProductUpdateController["router"]>();

export const productUpdateHttpApi =
  createHttpApi<ProductUpdateController["router"]>();
