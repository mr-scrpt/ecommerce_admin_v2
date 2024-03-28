"use client";
import { useAppearanceDelay } from "@/shared/lib/react";
import { Button } from "@/shared/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/ui/command";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { RadioGroupItem } from "@/shared/ui/radio-group";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { cn } from "@/shared/ui/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { RadioGroup } from "@radix-ui/react-radio-group";
import _ from "lodash";
import { FC, HTMLAttributes, useCallback, useEffect, useState } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { ProductToSelectGroup } from "../../_domain/types";

interface ProductSelectProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  control: UseFormReturn<any>["control"];
  handleSelect?: (value: string) => void;
  toSearch?: (search: string) => void;
  searchValue?: string;
  isPending: boolean;
  minChars?: number;
  field: ControllerRenderProps<any, any>;
  productGroup: ProductToSelectGroup;
}

// interface SearchOption {
//   label: string;
//   value: string;
//   field: keyof Product;
// }
//
// const searchByOptions: Record<string, SearchOption> = {
//   by_name: {
//     label: "By name",
//     value: "by_name",
//     field: "label",
//   },
//   by_article: {
//     label: "By article",
//     value: "by_article",
//     field: "article",
//   },
// };
//
export const ProductSelect: FC<ProductSelectProps> = (props) => {
  const {
    field,
    productGroup,
    isPending,
    minChars = 2,
    toSearch,
    className,
    searchValue,
  } = props;

  const { available, inOrder, outOfStock } = productGroup;

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
    <div className={cn(className, "flex w-full flex-col gap-3")}>
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
                ? available.find((product) => product.value === field.value)
                    ?.label || "Select product"
                : "Select product"}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[480px] p-0">
          <Command value={search} filter={() => 1}>
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
            {/* <ScrollArea className="h-auto max-h-72 rounded-md border"> */}
            <CommandList>
              {available.length !== 0 && (
                <CommandGroup heading="Available">
                  {available.map((product) => {
                    return (
                      <CommandItem
                        value={product.value}
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
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              )}

              {inOrder.length !== 0 && (
                <CommandGroup heading="In order">
                  {inOrder.map((product) => {
                    return (
                      <CommandItem
                        value={product.value}
                        key={product.value}
                        disabled={true}
                        className="flex w-full items-center gap-2 text-sm"
                      >
                        <div className="grow">{product.label}</div>
                        <div>{product.article}</div>
                        <div className="ml-auto flex max-w-[30px] gap-1 text-xs text-lime-400">
                          in
                        </div>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              )}
              {outOfStock.length !== 0 && (
                <CommandGroup heading="Out of stock">
                  {outOfStock.map((product) => {
                    return (
                      <CommandItem
                        value={product.value}
                        key={product.value}
                        disabled={true}
                        className="flex w-full items-center gap-2 text-sm"
                      >
                        <div className="grow">{product.label}</div>
                        <div>{product.article}</div>
                        <div className="ml-auto flex max-w-[30px] gap-1 text-xs text-red-400">
                          out
                        </div>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              )}
            </CommandList>

            {/* </ScrollArea> */}
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
