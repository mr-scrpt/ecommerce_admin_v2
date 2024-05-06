import React, { useRef, useState, useEffect, HTMLAttributes, FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { VirtualItem, useVirtualizer } from "@tanstack/react-virtual";
import { FormControl, FormField, FormItem, FormLabel } from "@/shared/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

interface ListItem {
  value: string;
  [key: string]: any;
}

interface SelectVirtualItem<T extends ListItem>
  extends HTMLAttributes<HTMLDivElement> {
  virtualData: VirtualItem;
  item: T;
  onSelect: () => void;
}

interface SelectVirtualProps<T extends ListItem>
  extends HTMLAttributes<HTMLDivElement> {
  control: UseFormReturn<any>["control"];
  itemList: T[];
  renderItem: (props: SelectVirtualItem<T>) => React.ReactNode;
  name: string;
}

interface VirtualizedContentProps<T extends ListItem> {
  maxHeight: string;
  options: T[];
  placeholder: string;
  onSelectOption?: (option: string) => void;
  renderItem: (props: SelectVirtualItem<T>) => React.ReactNode;
  isOpen: boolean;
  fieldValue: string;
}

const VirtualizedContent = <T extends ListItem>({
  maxHeight,
  options,
  isOpen,
  fieldValue,
}: VirtualizedContentProps<T>) => {
  const [optionList, setOptionList] = useState<T[]>(options);

  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (options.length > 0) {
      setOptionList(options);
    }
  }, [options]);

  const virtualizer = useVirtualizer({
    count: optionList.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan: 5,
  });

  // useEffect(() => {
  //   console.log("output_log: in virtualizedContent =>>>");
  //   if (!isOpen) return;
  //   virtualizer.measure();
  // }, [virtualizer, isOpen]);

  const virtualOptions = virtualizer.getVirtualItems();

  const curruntItem = optionList.find((item) => item.value === fieldValue);

  return (
    <div
      ref={parentRef}
      style={{
        height: maxHeight,
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
        {!isOpen && curruntItem && (
          <SelectItem
            value={curruntItem.value}
            key={curruntItem.value}
            // onSelect={onSelect}
          >
            {curruntItem.label}
          </SelectItem>
        )}
        {isOpen &&
          virtualOptions.map((virtualRow) => {
            const item = optionList[virtualRow.index];
            return (
              <SelectItem
                value={item.value}
                key={item.value}
                // onSelect={onSelect}
              >
                {item.label}
              </SelectItem>
            );
          })}
      </div>
    </div>
  );
};

// const Wrapper: FC<HTMLAttributes<HTMLDivElement>> = ({ children, ref }) => {
//   return (
//     <div
//       ref={parentRef}
//       style={{
//         height: maxHeight,
//         width: "100%",
//         overflow: "auto",
//       }}
//     ></div>
//   );
// };

export const SelectVirtual = <T extends ListItem>({
  control,
  itemList,
  renderItem,
  name,
}: SelectVirtualProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        console.log("output_log: field  value =>>>", field.value);
        return (
          <FormItem>
            <FormLabel>{name}</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              onOpenChange={(open) => {
                setIsOpen(open);
              }}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue
                    placeholder={`Select ${name}`}
                    defaultValue={field.value}
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <VirtualizedContent
                  maxHeight="300px"
                  options={itemList}
                  placeholder={`Select ${name}`}
                  renderItem={renderItem}
                  onSelectOption={field.onChange}
                  isOpen={isOpen}
                  fieldValue={field.value}
                />
              </SelectContent>
            </Select>
          </FormItem>
        );
      }}
    />
  );
};
