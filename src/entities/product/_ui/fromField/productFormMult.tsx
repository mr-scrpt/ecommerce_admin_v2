import { ProductDefaultSelectOption } from "@/kernel/domain/product/form.schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { MultiSelectElement } from "@/shared/ui/select/multiSelectElement";
import { FC, HTMLAttributes } from "react";
import { UseFormReturn } from "react-hook-form";

interface ProductFormMultProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  propertyList: ProductDefaultSelectOption[];
  control: UseFormReturn<any>["control"];
  setValue: UseFormReturn<any>["setValue"];
}

export const ProductFormMult: FC<ProductFormMultProps> = (props) => {
  const { name, propertyList, control, setValue } = props;
  return (
    <FormField
      control={control}
      key={name}
      name={`propertyList.${name}`}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{name}</FormLabel>
            <FormControl>
              <MultiSelectElement
                optionList={propertyList.map((row) => ({
                  value: row.value,
                  label: row.label,
                }))}
                optionActiveList={propertyList.filter((row) =>
                  field.value?.includes(row.value),
                )}
                onSelect={(value) => {
                  setValue(
                    `propertyList.${name}`,
                    value.map((row) => row.value),
                  );
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
