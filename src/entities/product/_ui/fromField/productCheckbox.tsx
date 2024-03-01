import { Checkbox } from "@/shared/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { MultiSelectOptionItem } from "@/shared/ui/multiSelect";
import { FC, HTMLAttributes } from "react";
import { UseFormReturn } from "react-hook-form";

interface ProductChechboxProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  // label: string;
  propertyList: MultiSelectOptionItem[];
  control: UseFormReturn<any>["control"];
}

export const ProductCheckbox: FC<ProductChechboxProps> = (props) => {
  const { name, propertyList, control } = props;

  return (
    <FormField
      control={control}
      key={name}
      name={`propertyList.${name}`}
      render={() => (
        <FormItem>
          <div className="mb-4">
            <FormLabel className="text-base">{name}</FormLabel>
            <FormDescription>
              Select the items {name.toLowerCase()}
            </FormDescription>
          </div>
          {propertyList.map((row) => (
            <FormField
              key={row.value}
              control={control}
              name={`propertyList.${name}`}
              render={({ field }) => {
                return (
                  <FormItem
                    key={row.value}
                    className="flex flex-row items-start space-x-3 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(row.value)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, row.value])
                            : field.onChange(
                                field.value?.filter(
                                  (value: string) => value !== row.value,
                                ),
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">
                      {row.label}
                    </FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
