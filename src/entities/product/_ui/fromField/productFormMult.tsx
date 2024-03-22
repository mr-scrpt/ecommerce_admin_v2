import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { MultiSelect, MultiSelectOptionItem } from "@/shared/ui/multiSelect";
import { FC, HTMLAttributes } from "react";
import { UseFormReturn } from "react-hook-form";

interface ProductFormMultProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  propertyList: MultiSelectOptionItem[];
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
              <MultiSelect
                optionList={propertyList.map((row) => ({
                  value: row.value,
                  label: row.label,
                }))}
                optionActiveList={propertyList.filter((row) =>
                  field.value?.includes(row.value),
                )}
                onSelected={(value) => {
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
