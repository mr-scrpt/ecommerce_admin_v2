import { useStaffListSearchToSelectModel } from "@/entities/staff/_vm/useStaffListSearchToSelect.model";
import { StaffDefaultSelectOption } from "@/kernel/domain/staff/form.schema";
import { SEARCH_MIN_LENGTH } from "@/shared/config/constant";
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

interface StaffSelectSearchElementProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  staffActive?: StaffDefaultSelectOption;
  onSelectStaff: (staff: StaffDefaultSelectOption) => void;
}

export const StaffSelectSearchElement: FC<StaffSelectSearchElementProps> = (
  props,
) => {
  const { onSelectStaff, staffActive } = props;

  const { staffListToSelect, isAppearancePending, toSearch, searchValue } =
    useStaffListSearchToSelectModel(staffActive?.value);

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

  const staffActiveItem = staffListToSelect.find(
    (staff) => staff.value === staffActive?.value,
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
                !staffActive?.value && "text-muted-foreground",
              )}
            >
              {staffActiveItem ? (
                <div className="flex w-full items-center gap-2">
                  <div className="left-0 grow text-left">
                    {staffActiveItem.name}
                  </div>
                  <div className="text-right text-xs opacity-50">
                    {staffActiveItem.lastName}
                  </div>
                  <div className="text-right text-xs opacity-50">
                    ({staffActiveItem.phone})
                  </div>
                </div>
              ) : (
                "Select staff"
              )}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[480px] p-0">
          <Command value={search} filter={() => 1}>
            <CommandInput
              placeholder="Search staff..."
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
                  : "Staff not found"}
              </CommandEmpty>
            )}
            <CommandList>
              {staffListToSelect.length !== 0 &&
                staffListToSelect.map((staff) => {
                  return (
                    <CommandItem
                      value={staff.value}
                      key={staff.value}
                      // disabled={staff.disabled || !staff.inStock}
                      onSelect={() => {
                        onSelectStaff({
                          label: staff.label,
                          value: staff.value,
                        });
                        setOpen(false);
                      }}
                      className="flex w-full items-center gap-2 text-sm"
                    >
                      <div className="grow">{staff.name}</div>
                      <div className="text-xs opacity-50">{staff.lastName}</div>
                      <div className="text-xs opacity-50">({staff.phone})</div>
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
