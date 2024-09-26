import { ProductDefaultSelectOption } from "@/kernel/domain/product/form.schema";

export type ProductSelectListOptionExtended = ProductDefaultSelectOption & {
  disabled: boolean;
};
