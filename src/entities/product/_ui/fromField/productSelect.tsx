import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { cn } from "@/shared/ui/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HTMLAttributes, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/shared/ui/command";
import { useProductListQuery } from "../..";
import { useProductListToSelect } from "../../_vm/useProductListToSelect";

interface ProductSelectProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  control: UseFormReturn<any>["control"];
  handleSelect?: (value: string) => void;
}

export const ProductSelect: FC<ProductSelectProps> = (props) => {
  const { control, name } = props;
  const { productList, isPending } = useProductListToSelect();

  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Product list</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-[200px] justify-between",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value
                    ? productList.find(
                        (product) => product.value === field.value,
                      )?.label
                    : "Select product"}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search product..." className="h-9" />
                <CommandEmpty>Product not found</CommandEmpty>
                <CommandGroup>
                  {productList.map((product) => (
                    <CommandItem
                      value={product.label}
                      key={product.value}
                      onSelect={() => {
                        // form.setValue("language", product.value);
                        field.onChange(product.value);
                        setOpen(false);
                        // handleSelect(product.value);
                        console.log("output_log:  =>>>", product.value);
                      }}
                    >
                      {product.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormDescription>Select product to add</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
