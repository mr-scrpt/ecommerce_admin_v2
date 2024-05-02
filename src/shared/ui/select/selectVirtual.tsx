// "use client";
import { FC, HTMLAttributes, forwardRef, useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { FormControl, FormField, FormItem, FormLabel } from "@/shared/ui/form";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

interface ListItem {
  value: string;
  [key: string]: any;
}

interface UniversalSelectProps<T extends ListItem>
  extends HTMLAttributes<HTMLDivElement> {
  control: UseFormReturn<any>["control"];
  items: T[];
  renderItem: (props: ListChildComponentProps<T[]>) => React.ReactNode;
  name: string;
}

interface VirtualizedSelectListProps<T extends ListItem> {
  items: T[];
  renderItem: (props: ListChildComponentProps<T[]>) => React.ReactNode;
  onChange: (value: string) => void;
  value: string;
}

const VirtualizedSelectList = forwardRef<
  FixedSizeList,
  VirtualizedSelectListProps<any>
>(({ items, renderItem, onChange, value }, ref) => {
  return (
    <FixedSizeList
      ref={ref}
      width={"100%"}
      height={350}
      itemCount={items.length}
      itemSize={35}
      itemData={items}
    >
      {renderItem}
    </FixedSizeList>
  );
});

VirtualizedSelectList.displayName = "VirtualizedSelectList";

export const UniversalSelect = <T extends ListItem>(
  props: UniversalSelectProps<T>,
) => {
  const { control, items, renderItem, name } = props;
  const listRef = useRef<FixedSizeList>(null);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        console.log("output_log:  =>>>", field);

        return (
          <FormItem>
            <FormLabel>{name}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={`Select ${name}`} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <VirtualizedSelectList
                  ref={listRef}
                  items={items}
                  renderItem={renderItem}
                  onChange={field.onChange}
                  value={field.value}
                />
              </SelectContent>
            </Select>
          </FormItem>
        );
      }}
    />
  );
};
