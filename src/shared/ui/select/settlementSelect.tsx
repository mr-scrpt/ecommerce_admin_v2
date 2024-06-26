import { SEARCH_MIN_LENGTH } from "@/shared/config/constant";
import { useAppearanceDelay } from "@/shared/lib/react";
import { Button } from "@/shared/ui/button";
import {
  Command,
  CommandEmpty,
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
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

export type SettleToSelect = {
  value: string;
  area: string;
  region: string;
  label: string;
};

interface SettlementSelectProps extends HTMLAttributes<HTMLDivElement> {
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

export const SettlementSelect: FC<SettlementSelectProps> = (props) => {
  const {
    field,
    citiesList,
    isPending,
    minChars = SEARCH_MIN_LENGTH,
    toSearch,
    handleSelect,

    className,
    searchValue,
  } = props;

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(searchValue);
  const debouncedToSearch = _.debounce((search) => toSearch?.(search), 1000);

  useEffect(() => {
    if (search && search.length > minChars) {
      // console.log("output_log:  search =>>>", search);
      debouncedToSearch(search);
    } else {
      // debouncedToSearch("");
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
                ? citiesList.find((settlement) => {
                    return settlement.value === field.value;
                  })?.label || "Select settlement 1"
                : "Select settlement 2"}
              <CaretSortIcon className="opasettlement-50 ml-2 h-4 w-4 shrink-0" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[480px] p-0">
          <Command value={search} filter={() => 1}>
            <CommandInput
              placeholder="Search settlements..."
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
                  : "Settlement not found"}
              </CommandEmpty>
            )}
            <CommandList>
              {!!citiesList.length &&
                citiesList.map((settlement) => {
                  return (
                    <CommandItem
                      value={settlement.value}
                      key={settlement.value}
                      onSelect={() => {
                        field.onChange(settlement.value);
                        handleSelect?.(settlement.value);
                        setOpen(false);
                      }}
                      className="flex w-full items-center gap-2 text-sm"
                    >
                      <div className="grow">
                        <span className="mr-1">{settlement.label}</span>

                        <span className="text-xs text-muted-foreground">
                          - {settlement.area}{" "}
                          {settlement.region ?? `(${settlement.region})`}
                        </span>
                      </div>
                    </CommandItem>
                  );
                })}
              {/* <FixedSizeList */}
              {/*   width={"100%"} */}
              {/*   height={350} */}
              {/*   itemCount={citiesList.length} */}
              {/*   itemSize={40} */}
              {/* > */}
              {/*   {({ index, style, isScrolling }) => ( */}
              {/*     <CommandItem */}
              {/*       value={citiesList[index].value} */}
              {/*       key={citiesList[index].value} */}
              {/*       onSelect={() => { */}
              {/*         field.onChange(citiesList[index].value); */}
              {/*         handleSelect?.(citiesList[index].value); */}
              {/*         setOpen(false); */}
              {/*       }} */}
              {/*       className="flex w-full items-center gap-2 text-sm" */}
              {/*     > */}
              {/*       <div className="grow"> */}
              {/*         <span className="mr-1">{citiesList[index].label}</span> */}
              {/**/}
              {/*         <span className="text-xs text-muted-foreground"> */}
              {/*           - {citiesList[index].area}{" "} */}
              {/*           {citiesList[index].region ?? */}
              {/*             `(${citiesList[index].region})`} */}
              {/*         </span> */}
              {/*       </div> */}
              {/*     </CommandItem> */}
              {/*   )} */}
              {/* </FixedSizeList> */}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
