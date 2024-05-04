import { SEARCH_MIN_LENGTH } from "@/shared/config/constant";
import { Button } from "@/shared/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/shared/ui/command";
import { FormControl, FormField } from "@/shared/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { cn } from "@/shared/ui/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { VirtualItem, useVirtualizer } from "@tanstack/react-virtual";
import _ from "lodash";
import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface CommandItem {
  value: string;
  [key: string]: any;
}

interface CommandVirtualItem<T extends CommandItem>
  extends HTMLAttributes<HTMLDivElement> {
  virtualData: VirtualItem;
  item: T;
  onSelect: () => void;
  isSelected: boolean;
}

interface VirtualizedCommandProps<T extends CommandItem> {
  maxHeight: string;
  options: T[];
  placeholder: string;
  selectedOption: string;
  onSelectOption?: (option: string) => void;
  setSearch?: (search: string) => void;
  renderItem: (props: CommandVirtualItem<T>) => React.ReactNode;
}

const VirtualizedCommand = <T extends CommandItem>({
  maxHeight,
  options,
  placeholder,
  selectedOption,
  onSelectOption,
  setSearch,
  renderItem,
}: VirtualizedCommandProps<T>) => {
  const [filteredOptions, setFilteredOptions] = useState<T[]>(options);
  const parentRef = useRef(null);

  useEffect(() => {
    if (options.length > 0) {
      setFilteredOptions(options);
    }
  }, [options]);

  const virtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan: 5,
  });

  const virtualOptions = virtualizer.getVirtualItems();

  const handleSearch = (search: string) => {
    setSearch?.(search);
    setFilteredOptions(
      options.filter((option) =>
        option.value.toLowerCase().includes(search.toLowerCase() ?? []),
      ),
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
    }
  };

  return (
    <Command shouldFilter={false} onKeyDown={handleKeyDown}>
      <CommandInput onValueChange={handleSearch} placeholder={placeholder} />
      <CommandEmpty>No item found.</CommandEmpty>
      <CommandGroup
        ref={parentRef}
        style={{
          maxHeight: maxHeight,
          width: "100%",
          overflow: "auto",
        }}
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {virtualOptions.map((virtualOption) => {
            const item = filteredOptions[virtualOption.index];

            return renderItem({
              virtualData: virtualOption,
              item,
              isSelected: selectedOption === item.value,
              onSelect: () => onSelectOption?.(item.value),
            });
          })}
        </div>
      </CommandGroup>
    </Command>
  );
};

interface ComboboxVirtualProps<T extends CommandItem>
  extends HTMLAttributes<HTMLDivElement> {
  control: UseFormReturn<any>["control"];
  itemList: Array<T>;
  renderItem: (props: CommandVirtualItem<T>) => React.ReactNode;
  name: string;

  handleSelect?: (value: string) => void;
  toSearch?: (search: string) => void;
  searchValue?: string;
  minChars?: number;
  maxHeight?: string;
  placeholder?: string;
}

export const ComboboxVirtual = <T extends CommandItem>(
  props: ComboboxVirtualProps<T>,
) => {
  const {
    itemList,
    minChars = SEARCH_MIN_LENGTH,
    toSearch,
    handleSelect,
    control,
    className,
    searchValue,
    name,
    maxHeight = "300px",
    renderItem,
    placeholder,
  } = props;

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(searchValue);
  const debouncedToSearch = _.debounce((search) => toSearch?.(search), 1000);

  useEffect(() => {
    if (search && search.length > minChars) {
      debouncedToSearch(search);
    }
  }, [debouncedToSearch, minChars, search, searchValue]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
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
                    ? (itemList.find((item) => {
                        return item.value === field.value;
                      })?.label ||
                        placeholder) ??
                      "Select item"
                    : "Select item"}

                  <CaretSortIcon className="opasettlement-50 ml-2 h-4 w-4 shrink-0" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[480px] p-0">
              <VirtualizedCommand
                maxHeight={maxHeight}
                options={itemList}
                placeholder="Search settlements..."
                selectedOption={field.value}
                setSearch={setSearch}
                onSelectOption={(value) => {
                  field.onChange(value);
                  handleSelect?.(value);
                  setOpen(false);
                }}
                renderItem={(props) => renderItem(props)}
              />
            </PopoverContent>
          </Popover>
        </div>
      )}
    />
  );
};
