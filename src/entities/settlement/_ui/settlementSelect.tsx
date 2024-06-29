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
import { FC, HTMLAttributes, useState } from "react";
import { useSettlemetListToSelect } from "../_vm/useSettlemetListToSelect";

interface SettlementSelectProps extends HTMLAttributes<HTMLDivElement> {}

export const SettlementSelect: FC<SettlementSelectProps> = (props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const { toSearch, settlementListToSelect, isPending, isSuccess } =
    useSettlemetListToSelect();

  console.log("output_log: list =>>>", settlementListToSelect);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-[480px] justify-between",
              // !field.value && "text-muted-foreground",
            )}
          >
            {value
              ? settlementListToSelect.find(
                  (framework) => framework.value === value,
                )?.label
              : "Select settlement..."}
            <CaretSortIcon className="opasettlement-50 ml-2 h-4 w-4 shrink-0" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[480px] p-0">
        <Command>
          <CommandInput
            placeholder="Search framework..."
            onValueChange={toSearch}
          />
          <CommandEmpty>No settlement found.</CommandEmpty>
          <CommandList>
            {settlementListToSelect.map((settlement) => (
              <CommandItem
                key={settlement.value}
                value={settlement.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === settlement.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {settlement.label}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
