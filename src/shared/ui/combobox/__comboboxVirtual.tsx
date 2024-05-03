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

export type SettleToSelect = {
  value: string;
  area: string;
  region: string;
  label: string;
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

export const ComboboxVirtual: FC<ComboboxVirtualProps> = (props) => {
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
                  <div className="w-full p-2 text-center text-sm">
                    Loaded...
                  </div>
                ) : (
                  <CommandEmpty>
                    {search && search.length <= minChars
                      ? "Minimum 3 characters"
                      : "Settlement not found"}
                  </CommandEmpty>
                )}

                <CommandList>
                  <VirtualizedList
                    ref={listRef}
                    items={citiesList}
                    onChange={field.onChange}
                    value={field.value}
                    // renderItem={SelectItem}
                    renderItem={({ index, style, data }) => {
                      const item = data[index];
                      if (!item) return null;

                      return (
                        <CommandItem
                        // value={item.value}
                        // key={item.value}
                        // style={style}
                        // onSelect={() => {
                        //   field.onChange(item.value);
                        //   handleSelect?.(item.value);
                        //   setOpen(false);
                        // }}
                        >
                          {item.label}
                        </CommandItem>
                      );
                    }}
                  />
                </CommandList>
              </Command>
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
