import { Settlement } from "@/kernel/domain/settlement/settlement.type";
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
import { Check } from "lucide-react";
import { FC, HTMLAttributes, useCallback, useEffect, useState } from "react";

import { useSettlementListSearchToSelectModel } from "../../../_vm/useSettlementListSearchToSelect.model";
import { Spinner } from "@/shared/ui/icons/spinner";

interface SettlementSelectProps extends HTMLAttributes<HTMLDivElement> {
  settlementActive?: Settlement["ref"];
  onSelectSettlement: (settlement: Settlement["ref"]) => void;
}

export const SettlementSelectElement: FC<SettlementSelectProps> = (props) => {
  const { settlementActive = "", onSelectSettlement } = props;
  const [open, setOpen] = useState(false);

  const {
    toSearch,
    settlementListToSelect,
    isAppearancePending,
    isSuccess,
    isFetchedAfterMount,
  } = useSettlementListSearchToSelectModel(settlementActive);

  const getButtonText = () => {
    if (isAppearancePending) return "Searching...";
    if (!settlementActive) return "Select settlement...";

    if (settlementListToSelect.length) {
      return (
        settlementListToSelect.find((s) => s.value === settlementActive)
          ?.label || "Select settlement..."
      );
    }

    return "Type to search...";
  };

  const onSelect = (currentValue: Settlement["ref"]) => {
    onSelectSettlement(currentValue);
    setOpen(false);
  };
  const isLoading = !isFetchedAfterMount || isAppearancePending;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-[480px] justify-between",
              !settlementActive && "text-muted-foreground",
            )}
          >
            {getButtonText()}
            {isLoading && <Spinner className="ml-2 h-4 w-4 animate-spin" />}
            <CaretSortIcon className="opasettlement-50 ml-2 h-4 w-4 shrink-0" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[480px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search framework..."
            onValueChange={toSearch}
          />
          <CommandEmpty>No settlement found.</CommandEmpty>

          <CommandGroup>
            <CommandList>
              {settlementListToSelect.map((s) => (
                <CommandItem key={s.value} value={s.value} onSelect={onSelect}>
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      settlementActive === s.value
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {s.label}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
