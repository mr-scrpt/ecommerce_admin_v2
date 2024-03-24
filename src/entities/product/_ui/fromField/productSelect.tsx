"use client";
import { useAppearanceDelay } from "@/shared/lib/react";
import { Button } from "@/shared/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/shared/ui/command";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { cn } from "@/shared/ui/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import _ from "lodash";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

interface ProductSelectProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  control: UseFormReturn<any>["control"];
  handleSelect?: (value: string) => void;
  toSearch?: (search: string) => void;
  searchValue?: string;
  isPending: boolean;
  minChars?: number;
  field: ControllerRenderProps<any, any>;
  productList: Array<{
    value: string;
    label: string;
    inStock: boolean;
    disabled: boolean;
  }>;
}

export const ProductSelect: FC<ProductSelectProps> = (props) => {
  const {
    field,
    productList,
    isPending,
    minChars = 2,
    toSearch,
    searchValue,
  } = props;

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(searchValue);
  const debouncedToSearch = _.debounce((search) => toSearch?.(search), 1000);

  useEffect(() => {
    if (search && search.length > minChars) {
      debouncedToSearch(search);
    } else {
      debouncedToSearch("");
    }
  }, [debouncedToSearch, minChars, search, searchValue]);

  const appearancePending = useAppearanceDelay(isPending);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-[280px] justify-between",
              !field.value && "text-muted-foreground",
            )}
          >
            {field.value
              ? productList.find((product) => product.value === field.value)
                  ?.label
              : "Select product"}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0">
        <Command>
          <CommandInput
            placeholder="Search product..."
            className="h-9"
            onValueChange={setSearch}
            value={search}
          />
          {appearancePending ? (
            <div className="w-full p-2 text-center text-sm">Loaded...</div>
          ) : (
            <CommandEmpty>
              {search && search.length <= minChars
                ? "Minimum 3 characters"
                : "Product not found"}
            </CommandEmpty>
          )}
          <CommandGroup>
            {productList.map((product) => {
              return (
                <CommandItem
                  value={product.label}
                  key={product.value}
                  disabled={product.disabled || !product.inStock}
                  onSelect={() => {
                    field.onChange(product.value);
                    setOpen(false);
                  }}
                >
                  <div className="grow">{product.label}</div>
                  <span className="ml-auto flex max-w-[30px] gap-1 text-xs">
                    <div className="text-lime-400">
                      {product.disabled && "in"}
                    </div>
                    <div className="text-red-400">
                      {product.inStock || "out"}
                    </div>
                  </span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
