import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { ProductController } from "../_controller/product.controller";

export const productApi = createApi<ProductController["router"]>();

export const productHttpApi = createHttpApi<ProductController["router"]>();
