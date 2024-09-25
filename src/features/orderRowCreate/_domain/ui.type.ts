import { ProductDefaultSelectOption } from "@/kernel/domain/product/form.schema";

export type OrderProductSelectListOption = ProductDefaultSelectOption & {
  disabled: boolean;
};
