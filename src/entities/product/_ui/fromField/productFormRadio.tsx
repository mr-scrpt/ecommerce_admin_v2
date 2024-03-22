import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { MultiSelectOptionItem } from "@/shared/ui/multiSelect";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { FC, HTMLAttributes } from "react";
import { UseFormReturn } from "react-hook-form";

interface ProductFormRadioProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  propertyList: MultiSelectOptionItem[];
  control: UseFormReturn<any>["control"];
}

export const ProductFormRadio: FC<ProductFormRadioProps> = (props) => {
  const { name, propertyList, control } = props;
  return (
    <FormField
      control={control}
      key={name}
      name={`propertyList.${name}`}
      render={({ field }) => {
        return (
          <FormItem className="space-y-3">
            <FormLabel>{name}</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                {propertyList.map((row) => (
                  <FormItem
                    key={row.value}
                    className="flex items-center space-x-3 space-y-0"
                  >
                    <FormControl>
                      <RadioGroupItem value={row.value} />
                    </FormControl>
                    <FormLabel className="font-normal">{row.label}</FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
