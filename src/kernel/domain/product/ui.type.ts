import { ProductDefaultSelectOption } from "./form.schema";

export type ProductSelectListOptionExtended = ProductDefaultSelectOption & {
  disabled: boolean;
};
