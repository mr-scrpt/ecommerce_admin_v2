"use client";

// import * as from "react";
import { X } from "lucide-react";
import { Badge } from "../badge";

import { Command, CommandGroup, CommandItem } from "../command";
import { Command as CommandPrimitive } from "cmdk";
import { isEqual } from "lodash-es";
import {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  KeyboardEvent,
} from "react";
import { DefaultSelectOption } from "@/shared/type/select";

interface MultiSelectProps<
  T extends DefaultSelectOption = DefaultSelectOption,
> {
  optionList: Array<T>;
  optionActiveList?: Array<T>;
  onSelect: (items: Array<T>) => void;
}

export const MultiSelectElementInner = <T extends DefaultSelectOption>(
  props: MultiSelectProps<T>,
) => {
  const { optionList, optionActiveList = [], onSelect } = props;

  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<T[]>([]);

  useEffect(() => {
    setSelected(optionActiveList);
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);
  const prevOptionActiveList = useRef<T[]>(optionActiveList);

  useEffect(() => {
    if (!isEqual(optionActiveList, prevOptionActiveList.current)) {
      onSelect(optionActiveList);
      setSelected(optionActiveList);
      prevOptionActiveList.current = optionActiveList;
    }
  }, [optionActiveList, onSelect]);

  const handleUnselect = useCallback(
    (optionItem: T) => {
      setSelected((prev) => prev.filter((s) => s.value !== optionItem.value));
      onSelect &&
        onSelect(selected.filter((s) => s.value !== optionItem.value));
    },
    [selected, onSelect],
  );

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "") {
          setSelected((prev) => {
            const newSelected = [...prev];
            newSelected.pop();
            return newSelected;
          });
        }
      }
      if (e.key === "Escape") {
        input.blur();
      }
    }
  }, []);

  const selectables = useMemo(() => {
    return optionList.filter((optionItem) => {
      const exist = !selected.some((selectedItem) => {
        return (
          selectedItem.value === optionItem.value &&
          selectedItem.label === optionItem.label
        );
      });
      return exist;
    });
  }, [optionList, selected]);

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((optionItem) => {
            return (
              <Badge key={optionItem.value} variant="secondary">
                {optionItem.label}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(optionItem);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(optionItem)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => {
              onSelect && onSelect([...selected]);
              setOpen(false);
            }}
            onFocus={() => {
              setOpen(true);
            }}
            placeholder="Select variants..."
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ? (
          <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto">
              {selectables.map((optionItem) => {
                return (
                  <CommandItem
                    key={optionItem.value}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={(_) => {
                      setInputValue("");
                      setSelected((prev) => [...prev, optionItem]);
                      onSelect && onSelect([...selected, optionItem]);
                    }}
                    className={"cursor-pointer"}
                  >
                    {optionItem.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  );
};
export const MultiSelectElement = memo(MultiSelectElementInner) as <
  T extends DefaultSelectOption,
>(
  props: MultiSelectProps<T>,
) => JSX.Element;

MultiSelectElementInner.displayName = "MultiSelect";
