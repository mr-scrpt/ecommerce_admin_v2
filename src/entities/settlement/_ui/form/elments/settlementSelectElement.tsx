import { Settlement } from "@/kernel/domain/settlement/settlement.type";
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
import { Check } from "lucide-react";
import { FC, HTMLAttributes, useEffect, useState } from "react";

import { useSettlemetListToSelect } from "../../../_vm/useSettlemetListToSelect";

interface SettlementSelectProps extends HTMLAttributes<HTMLDivElement> {
  settlementActive?: Settlement["ref"];
  onSelectSettlement?: (settlement: Settlement["ref"]) => void;
}

export const SettlementSelectElement: FC<SettlementSelectProps> = (props) => {
  const { settlementActive, onSelectSettlement } = props;
  const [open, setOpen] = useState(false);
  const [settlement, setSettlement] = useState(settlementActive);

  const { toSearch, settlementListToSelect, isPending, isSuccess } =
    useSettlemetListToSelect(settlement);

  const getButtonText = () => {
    if (isPending) return "Searching...";
    if (!settlement) return "Select settlement...";

    if (settlementListToSelect.length) {
      return (
        settlementListToSelect.find((s) => s.value === settlement)?.label ||
        "Select settlement..."
      );
    }

    return "Type to search...";
  };

  useEffect(() => {
    if (isSuccess && settlement) {
      onSelectSettlement?.(settlement);
    }
  }, [isSuccess, onSelectSettlement, settlement]);

  const onSelect = (currentValue: Settlement["ref"]) => {
    setSettlement(currentValue === settlement ? "" : currentValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-[480px] justify-between",
              !settlement && "text-muted-foreground",
            )}
          >
            {getButtonText()}
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
          <CommandList>
            {settlementListToSelect.map((s) => (
              <CommandItem key={s.value} value={s.value} onSelect={onSelect}>
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    settlement === s.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {s.label}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
