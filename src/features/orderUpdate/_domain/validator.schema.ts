import { z } from "zod";

import {
  orderRowCreateSchema,
  orderRowSelectorSchema,
  orderSelectorSchema,
  orderStatusPaymentUpdateSchema,
  orderStatusStateUpdateSchema,
} from "./schema";

export const updateInputSchema = z.object({
  selector: orderSelectorSchema,
  orderStatusStateData: orderStatusStateUpdateSchema,
  orderStatusPaymentData: orderStatusPaymentUpdateSchema,
});

export const createRowInputSchema = z.object({
  selector: orderRowSelectorSchema,
  orderRowData: orderRowCreateSchema,
});
