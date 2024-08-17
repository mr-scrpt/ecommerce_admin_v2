import { SelectOptionItem } from "@/shared/type/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { FC, HTMLAttributes } from "react";
import { UseFormReturn } from "react-hook-form";

interface ProductFormSelectProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  propertyList: SelectOptionItem[];
  control: UseFormReturn<any>["control"];
}

export const ProductFormSelect: FC<ProductFormSelectProps> = (props) => {
  const { name, propertyList, control } = props;
  return (
    <FormField
      key={name}
      control={control}
      name={`propertyList.${name}`}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{name}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select vatiants" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {propertyList.map((row) => (
                  <SelectItem key={row.value} value={row.value}>
                    {row.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
