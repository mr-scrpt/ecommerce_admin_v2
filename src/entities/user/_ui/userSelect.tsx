"use client";
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
import { FormControl } from "@/shared/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { cn } from "@/shared/ui/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import _ from "lodash";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { SEARCH_MIN_LENGTH } from "@/shared/config/constant";
import { UserToSelect } from "../_domain/ui.type";

interface UserSelectProps extends HTMLAttributes<HTMLDivElement> {
  control: UseFormReturn<any>["control"];
  handleSelect?: (value: string) => void;
  toSearch?: (search: string) => void;
  searchValue?: string;
  isPending: boolean;
  minChars?: number;
  field: ControllerRenderProps<any, any>;
  userList: Array<UserToSelect>;
}

export const UserSelect: FC<UserSelectProps> = (props) => {
  const {
    field,
    userList,
    isPending,
    minChars = SEARCH_MIN_LENGTH,
    toSearch,
    className,
    searchValue,
    handleSelect,
  } = props;

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(searchValue);
  const debouncedToSearch = _.debounce((search) => toSearch?.(search), 1000);

  useEffect(() => {
    if (search && search.length > minChars) {
      debouncedToSearch(search);
    } else {
      debouncedToSearch("");
    }
  }, [debouncedToSearch, minChars, search, searchValue]);

  const appearancePending = useAppearanceDelay(isPending);

  return (
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
                ? userList.find((user) => user.value === field.value)?.label ||
                  "Select user"
                : "Select user"}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[480px] p-0">
          <Command value={search} filter={() => 1}>
            <CommandInput
              placeholder="Search user..."
              className="h-9"
              onValueChange={setSearch}
              value={search}
            />
            {appearancePending ? (
              <div className="w-full p-2 text-center text-sm">Loaded...</div>
            ) : (
              <CommandEmpty>
                {search && search.length <= minChars
                  ? "Minimum 3 characters"
                  : "User not found"}
              </CommandEmpty>
            )}
            <CommandList>
              {userList.length !== 0 && (
                <CommandGroup heading="User">
                  {userList.map((user) => {
                    return (
                      <CommandItem
                        value={user.value}
                        key={user.value}
                        // disabled={user.disabled || !user.inStock}
                        onSelect={() => {
                          field.onChange(user.value);
                          handleSelect?.(user.value);
                          setOpen(false);
                        }}
                        className="flex w-full items-center gap-2 text-sm"
                      >
                        <div className="grow">{user.label}</div>
                        <div>{user.phone}</div>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
