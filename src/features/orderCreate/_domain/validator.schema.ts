import { z } from "zod";
import {
  orderCreateSchema,
  orderEmptyCreateSchema,
  orderRowCreateSchema,
} from "./schema";

export const createInputSchema = z.object({
  orderData: orderCreateSchema,
  orderRowData: orderRowCreateSchema,
});

export const createEmptyInputSchema = z.object({
  orderData: orderEmptyCreateSchema,
});
