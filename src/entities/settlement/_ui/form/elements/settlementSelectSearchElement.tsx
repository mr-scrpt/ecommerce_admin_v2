import { useSettlementListSearchToSelectModel } from "@/entities/settlement/_vm/useSettlementListSearchToSelect.model";
import { SEARCH_MIN_LENGTH } from "@/shared/config/constant";
import { SelectOptionItem } from "@/shared/type/select";
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

interface SettlementSelectSearchElementProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  settlementActive?: SelectOptionItem;
  onSelectSettlement: (settlement: SelectOptionItem) => void;
}

export const SettlementSelectSearchElement: FC<
  SettlementSelectSearchElementProps
> = (props) => {
  const { onSelectSettlement, settlementActive } = props;

  const { settlementListToSelect, isAppearancePending, toSearch, searchValue } =
    useSettlementListSearchToSelectModel(settlementActive?.value);

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

  const settlementActiveItem = settlementListToSelect.find(
    (settlement) => settlement.value === settlementActive?.value,
  );

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
                !settlementActive?.value && "text-muted-foreground",
              )}
            >
              {settlementActiveItem ? (
                <div className="flex items-center gap-2">
                  <div className="left-0 grow text-left">
                    {settlementActiveItem.label}
                  </div>
                  <div className="text-right text-xs opacity-50">
                    {settlementActiveItem.area}
                  </div>
                  <div className="text-right text-xs opacity-50">
                    {settlementActiveItem.region}
                  </div>
                </div>
              ) : (
                "Select settlement"
              )}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[480px] p-0">
          <Command value={search} filter={() => 1}>
            <CommandInput
              placeholder="Search settlement..."
              className="h-9"
              onValueChange={setSearch}
              value={search}
            />
            {isAppearancePending ? (
              <div className="w-full p-2 text-center text-sm">Loaded...</div>
            ) : (
              <CommandEmpty>
                {search && search.length <= SEARCH_MIN_LENGTH
                  ? "Minimum 3 characters"
                  : "Settlement not found"}
              </CommandEmpty>
            )}
            <CommandList>
              {settlementListToSelect.length !== 0 &&
                settlementListToSelect.map((settlement) => {
                  return (
                    <CommandItem
                      value={settlement.value}
                      key={settlement.value}
                      // disabled={settlement.disabled || !settlement.inStock}
                      onSelect={() => {
                        onSelectSettlement({
                          label: settlement.label,
                          value: settlement.value,
                        });
                        setOpen(false);
                      }}
                      className="flex w-full items-center gap-2 text-sm"
                    >
                      <div className="grow">{settlement.label}</div>
                      <div className="text-xs opacity-50">
                        {settlement.area}
                      </div>
                      <div className="text-xs opacity-50">
                        {settlement.region}
                      </div>
                    </CommandItem>
                  );
                })}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
