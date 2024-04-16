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
import { FC, HTMLAttributes, useEffect, useState } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { SettleToSelect } from "../../_domain/delivery.types";
import { SEARCH_MIN_LENGTH } from "@/shared/config/constant";
import _ from "lodash";
import { useAppearanceDelay } from "@/shared/lib/react";

interface DeliveryCitySelectProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  control: UseFormReturn<any>["control"];
  handleSelect?: (value: string) => void;
  toSearch?: (search: string) => void;
  searchValue?: string;
  isPending: boolean;
  minChars?: number;
  field: ControllerRenderProps<any, any>;
  citiesList: Array<SettleToSelect>;
}

export const DeliveryCitySelect: FC<DeliveryCitySelectProps> = (props) => {
  const {
    field,
    citiesList,
    isPending,
    minChars = SEARCH_MIN_LENGTH,
    toSearch,
    className,
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
                ? citiesList.find((city) => city.value === field.value)
                    ?.label || "Select city"
                : "Select city"}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[480px] p-0">
          <Command value={search} filter={() => 1}>
            <CommandInput
              placeholder="Search city..."
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
                  : "City not found"}
              </CommandEmpty>
            )}
            <CommandList>
              {!!citiesList.length && (
                <CommandGroup heading="Available">
                  {citiesList.map((city) => {
                    return (
                      <CommandItem
                        value={city.value}
                        key={city.value}
                        onSelect={() => {
                          field.onChange(city.value);
                          setOpen(false);
                        }}
                        className="flex w-full items-center gap-2 text-sm"
                      >
                        <div className="grow">{city.label}</div>
                        <div>{city.area}</div>
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
