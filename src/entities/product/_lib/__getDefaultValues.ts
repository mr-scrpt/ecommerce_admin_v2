import { OptionSelect } from "@/entities/option";
import { ProductFormValues } from "../_domain/product.schema";

type DynamicFields<T> = {
  [K in keyof T]: Record<string, boolean>;
};

const getDefaultValues = <T extends ProductFormValues>(
  defaultValues: T,
  optionSelectOptionList?: Array<OptionSelect>,
): T & DynamicFields<T> => {
  const dynamicValues: DynamicFields<T> = {} as DynamicFields<T>;

  // Добавляем динамические поля на основе optionSelectOptionList
  optionSelectOptionList &&
    optionSelectOptionList.forEach((option) => {
      const optionFields: Record<string, boolean> = {}; // Явное объявление типа
      option.optionList.forEach((item) => {
        optionFields[item.label] = item.active;
      });
      dynamicValues[option.name as keyof T] = optionFields;
    });

  return { ...defaultValues, ...dynamicValues };
};
