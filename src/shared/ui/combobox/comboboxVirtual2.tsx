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
import { FormControl, FormField } from "@/shared/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { cn } from "@/shared/ui/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import _ from "lodash";
import {
  FC,
  HTMLAttributes,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { UseFormReturn } from "react-hook-form";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Check } from "lucide-react";

export type SettleToSelect = {
  value: string;
  area: string;
  region: string;
  label: string;
};
interface VirtualizedCommandProps {
  height: string;
  options: SettleToSelect[];
  placeholder: string;
  selectedOption: string;
  onSelectOption?: (option: string) => void;
  setSearch?: (search: string) => void;
}

const VirtualizedCommand = ({
  height,
  options,
  placeholder,
  selectedOption,
  onSelectOption,
  setSearch,
}: VirtualizedCommandProps) => {
  const [filteredOptions, setFilteredOptions] =
    useState<SettleToSelect[]>(options);
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
          height: height,
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
          {virtualOptions.map((virtualOption) => (
            <CommandItem
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualOption.size}px`,
                transform: `translateY(${virtualOption.start}px)`,
              }}
              key={filteredOptions[virtualOption.index].value}
              value={filteredOptions[virtualOption.index].value}
              onSelect={onSelectOption}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  selectedOption === filteredOptions[virtualOption.index].value
                    ? "opacity-100"
                    : "opacity-0",
                )}
              />
              {filteredOptions[virtualOption.index].label}
            </CommandItem>
          ))}
        </div>
      </CommandGroup>
    </Command>
  );
};

interface ComboboxVirtualProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  control: UseFormReturn<any>["control"];
  handleSelect?: (value: string) => void;
  toSearch?: (search: string) => void;
  searchValue?: string;
  isPending: boolean;
  minChars?: number;
  citiesList: Array<SettleToSelect>;
}

interface ListItem {
  value: string;
  [key: string]: any;
}

interface ComboboxVirtualizedListProps<T extends ListItem> {
  items: T[];
  renderItem: (props: ListChildComponentProps<T[]>) => React.ReactNode;
  onChange: (value: string) => void;
  value: string;
}

const VirtualizedList = forwardRef<
  FixedSizeList,
  ComboboxVirtualizedListProps<any>
>(({ items, renderItem, onChange, value }, ref) => {
  return (
    <FixedSizeList
      ref={ref}
      width={"100%"}
      height={350}
      itemCount={items.length ?? 0}
      itemSize={35}
      itemData={items ?? []}
    >
      {renderItem}
    </FixedSizeList>
  );
});

VirtualizedList.displayName = "VirtualizedList";

export const ComboboxVirtual2: FC<ComboboxVirtualProps> = (props) => {
  const {
    citiesList,
    isPending,
    minChars = SEARCH_MIN_LENGTH,
    toSearch,
    handleSelect,
    control,
    className,
    searchValue,
    name,
  } = props;

  console.log("output_log:  citiesList =>>>", citiesList);
  const listRef = useRef<FixedSizeList>(null);

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
  // const [selectedOption, setSelectedOption] = useState<string>("");
  // console.log("output_log: selectedOption =>>>", selectedOption);
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
                  {/* {selectedOption */}
                  {/*   ? citiesList.find( */}
                  {/*       (option) => option.value === selectedOption, */}
                  {/*     ) */}
                  {/*   : "dddd"} */}
                  {field.value
                    ? citiesList.find((settlement) => {
                        return settlement.value === field.value;
                      })?.label || "Select settlement 1"
                    : "Select settlement 2"}
                  {/* {field.value} */}
                  <CaretSortIcon className="opasettlement-50 ml-2 h-4 w-4 shrink-0" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[480px] p-0">
              <VirtualizedCommand
                height={"350"}
                options={citiesList}
                placeholder="Search settlements..."
                selectedOption={field.value}
                setSearch={setSearch}
                onSelectOption={(value) => {
                  field.onChange(value);
                  handleSelect?.(value);
                  setOpen(false);
                }}
              />
              {/* <Command value={search} filter={() => 1}> */}
              {/*   <CommandInput */}
              {/*     placeholder="Search settlements..." */}
              {/*     className="h-9" */}
              {/*     onValueChange={setSearch} */}
              {/*     value={search} */}
              {/*   /> */}
              {/*   {appearancePending ? ( */}
              {/*     <div className="w-full p-2 text-center text-sm"> */}
              {/*       Loaded... */}
              {/*     </div> */}
              {/*   ) : ( */}
              {/*     <CommandEmpty> */}
              {/*       {search && search.length <= minChars */}
              {/*         ? "Minimum 3 characters" */}
              {/*         : "Settlement not found"} */}
              {/*     </CommandEmpty> */}
              {/*   )} */}
              {/**/}
              {/*   <CommandList> */}
              {/*     <VirtualizedList */}
              {/*       ref={listRef} */}
              {/*       items={citiesList} */}
              {/*       onChange={field.onChange} */}
              {/*       value={field.value} */}
              {/*       // renderItem={SelectItem} */}
              {/*       renderItem={({ index, style, data }) => { */}
              {/*         const item = data[index]; */}
              {/*         if (!item) return null; */}
              {/**/}
              {/*         return ( */}
              {/*           <CommandItem */}
              {/*           // value={item.value} */}
              {/*           // key={item.value} */}
              {/*           // style={style} */}
              {/*           // onSelect={() => { */}
              {/*           //   field.onChange(item.value); */}
              {/*           //   handleSelect?.(item.value); */}
              {/*           //   setOpen(false); */}
              {/*           // }} */}
              {/*           > */}
              {/*             {item.label} */}
              {/*           </CommandItem> */}
              {/*         ); */}
              {/*       }} */}
              {/*     /> */}
              {/*   </CommandList> */}
              {/* </Command> */}
            </PopoverContent>
          </Popover>
        </div>
      )}
    />
  );
};

const SelectItem = ({
  key,
  index,
  style,
  data,
}: {
  key: string;
  index: number;
  style: React.CSSProperties;
  data: SettleToSelect[];
}) => (
  <CommandItem value={data[index]?.label} style={style} key={key}>
    {data[index]?.label}
  </CommandItem>
);

// {!!citiesList.length &&
//   citiesList.map((settlement) => {
//     return (
//       <CommandItem
//         value={settlement.value}
//         key={settlement.value}
//         onSelect={() => {
//           field.onChange(settlement.value);
//           handleSelect?.(settlement.value);
//           setOpen(false);
//         }}
//         className="flex w-full items-center gap-2 text-sm"
//       >
//         <div className="grow">
//           <span className="mr-1">{settlement.label}</span>
//
//           <span className="text-xs text-muted-foreground">
//             - {settlement.area}{" "}
//             {settlement.region ?? `(${settlement.region})`}
//           </span>
//         </div>
//       </CommandItem>
//     );
//   })}
//
