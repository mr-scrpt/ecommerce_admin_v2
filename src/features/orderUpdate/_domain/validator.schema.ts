import { z } from "zod";
import {
  orderPaymentStatusUpdateSchema,
  orderRowSelectorSchema,
  orderStatusUpdateSchema,
} from "./schema";

export const updateInputSchema = z.object({
  selector: orderRowSelectorSchema,
  orderStatusData: orderStatusUpdateSchema,
  orderPaymentStatusData: orderPaymentStatusUpdateSchema,
});
