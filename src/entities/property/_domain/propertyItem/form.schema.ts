import { selectItemWithIdSchema } from "@/shared/type/select";
import { z } from "zod";

export const propertyItemFormSchema = z.object({
  propertyItemList: z.array(selectItemWithIdSchema(z.string())),
});

export type PropertyItemFormDefaultValues<
  T extends z.ZodTypeAny = typeof propertyItemFormSchema,
> = z.infer<T>;

// TODO: DefaultValues
export const defaultFieldsValues: PropertyItemFormDefaultValues = {
  propertyItemList: [{ label: "", value: "", id: "" }],
};
