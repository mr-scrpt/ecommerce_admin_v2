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
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { RadioGroupItem } from "@/shared/ui/radio-group";
import { cn } from "@/shared/ui/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { RadioGroup } from "@radix-ui/react-radio-group";
import _ from "lodash";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

interface Product {
  value: string;
  article: string;
  label: string;
  inStock: boolean;
  disabled: boolean;
}

interface ProductSelectProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  control: UseFormReturn<any>["control"];
  handleSelect?: (value: string) => void;
  toSearch?: (search: string) => void;
  searchValue?: string;
  isPending: boolean;
  minChars?: number;
  field: ControllerRenderProps<any, any>;
  productList: Array<Product>;
}

interface SearchOption {
  label: string;
  value: string;
  field: keyof Product;
}

const searchByOptions: Record<string, SearchOption> = {
  by_name: {
    label: "By name",
    value: "by_name",
    field: "label",
  },
  by_article: {
    label: "By article",
    value: "by_article",
    field: "article",
  },
};

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

  // const [searchBy, setSearchBy] = useState(searchByOptions.by_name.value);
  // const [searchOption, setSearchOption] = useState(
  //   searchByOptions.by_name.field,
  // );
  const [searchOption, setSearchOption] = useState<keyof Product>(
    searchByOptions.by_name.field,
  );

  return (
    <div>
      <FormItem className="space-y-3">
        <FormLabel>Notify me about...</FormLabel>
        <FormControl>
          <RadioGroup
            onValueChange={(option) => {
              setSearchOption(option as keyof Product);
              // setSearchBy(value);g
            }}
            defaultValue={searchOption}
            className="flex flex-col space-y-1"
          >
            {Object.values(searchByOptions).map((option) => (
              <FormItem
                key={option.value}
                className="flex items-center space-x-3 space-y-0"
              >
                <FormControl>
                  <RadioGroupItem value={option.field} />
                </FormControl>
                <FormLabel className="font-normal">{option.label}</FormLabel>
              </FormItem>
            ))}
            {/* <FormItem className="flex items-center space-x-3 space-y-0"> */}
            {/*   <FormControl> */}
            {/*     <RadioGroupItem value="name" /> */}
            {/*   </FormControl> */}
            {/*   <FormLabel className="font-normal">By name</FormLabel> */}
            {/* </FormItem> */}
            {/**/}
            {/* <FormItem className="flex items-center space-x-3 space-y-0"> */}
            {/*   <FormControl> */}
            {/*     <RadioGroupItem value="article" /> */}
            {/*   </FormControl> */}
            {/*   <FormLabel className="font-normal">By article</FormLabel> */}
            {/* </FormItem> */}
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "w-[480px] justify-between",
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
        <PopoverContent className="w-[480px] p-0">
          <Command value={search}>
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
                    // value={
                    //   searchBy === "by_name" ? product.label : product.article
                    // }
                    value={product[searchOption] as string}
                    key={product.value}
                    disabled={product.disabled || !product.inStock}
                    onSelect={() => {
                      field.onChange(product.value);
                      setOpen(false);
                    }}
                    className="flex w-full items-center gap-2 text-sm"
                  >
                    <div className="grow">{product.label}</div>
                    <div>{product.article}</div>
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
    </div>
  );
};
