import { ProductDefaultSelectOption } from "@/kernel/domain/product/form.schema";
import { SEARCH_MIN_LENGTH } from "@/shared/config/constant";
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
import { FormControl } from "@/shared/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { cn } from "@/shared/ui/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import _ from "lodash";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import { useProductListGroupSearchToSelectModel } from "../../../_vm/useProductListGroupSearchToSelect.model";

interface ProductSelectGroupSearchElementProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  productActive?: ProductDefaultSelectOption;
  productInOrder: Array<string>;
  onSelectProduct: (product: ProductDefaultSelectOption) => void;
}

export const ProductSelectGroupSearchElement: FC<
  ProductSelectGroupSearchElementProps
> = (props) => {
  const { onSelectProduct, productActive, productInOrder } = props;

  const { productGroup, isPending, toSearch, searchValue } =
    useProductListGroupSearchToSelectModel(productInOrder);

  const { available, inOrder, outOfStock } = productGroup;

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(searchValue);
  const debouncedToSearch = _.debounce((search) => toSearch?.(search), 1000);

  useEffect(() => {
    if (search && search.length > SEARCH_MIN_LENGTH) {
      debouncedToSearch(search);
    } else {
      debouncedToSearch("");
    }
  }, [debouncedToSearch, search, searchValue]);

  const appearancePending = useAppearanceDelay(isPending);

  return (
    <div className={"flex w-full flex-col gap-3"}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "w-[480px] justify-between",
                !productActive?.value && "text-muted-foreground",
              )}
            >
              {productActive?.value
                ? available.find(
                    (product) => product.value === productActive.value,
                  )?.label || "Select product"
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
                {search && search.length <= SEARCH_MIN_LENGTH
                  ? "Minimum 3 characters"
                  : "Product not found"}
              </CommandEmpty>
            )}
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
                          onSelectProduct({
                            label: product.label,
                            value: product.value,
                          });
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
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
