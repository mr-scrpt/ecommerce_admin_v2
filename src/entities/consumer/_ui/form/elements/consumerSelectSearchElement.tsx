import { useConsumerListSearchToSelectModel } from "@/entities/consumer/_vm/useConsumerListSearchToSelect.model";
import { ConsumerDefaultSelectOption } from "@/kernel/domain/consumer/form.schema";
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

interface ConsumerSelectSearchElementProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  consumerActive?: ConsumerDefaultSelectOption | null;
  onSelectConsumer: (consumer: ConsumerDefaultSelectOption) => void;
}

export const ConsumerSelectSearchElement: FC<
  ConsumerSelectSearchElementProps
> = (props) => {
  const { onSelectConsumer, consumerActive } = props;

  const { consumerListToSelect, isAppearancePending, toSearch, searchValue } =
    useConsumerListSearchToSelectModel(consumerActive?.value);

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

  const consumerActiveItem = consumerListToSelect.find(
    (consumer) => consumer.value === consumerActive?.value,
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
                !consumerActive?.value && "text-muted-foreground",
              )}
            >
              {consumerActiveItem ? (
                <div className="flex w-full items-center gap-2">
                  <div className="left-0 grow text-left">
                    {consumerActiveItem.name}
                  </div>
                  <div className="text-right text-xs opacity-50">
                    {consumerActiveItem.lastName}
                  </div>
                  <div className="text-right text-xs opacity-50">
                    ({consumerActiveItem.phone})
                  </div>
                </div>
              ) : (
                "Select consumer"
              )}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[480px] p-0">
          <Command value={search} filter={() => 1}>
            <CommandInput
              placeholder="Search consumer..."
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
                  : "Consumer not found"}
              </CommandEmpty>
            )}
            <CommandList>
              {consumerListToSelect.length !== 0 &&
                consumerListToSelect.map((consumer) => {
                  return (
                    <CommandItem
                      value={consumer.value}
                      key={consumer.value}
                      // disabled={consumer.disabled || !consumer.inStock}
                      onSelect={() => {
                        onSelectConsumer({
                          label: consumer.label,
                          value: consumer.value,
                          name: consumer.name,
                          lastName: consumer.lastName,
                          phone: consumer.phone,
                        });
                        setOpen(false);
                      }}
                      className="flex w-full items-center gap-2 text-sm"
                    >
                      <div className="grow">{consumer.name}</div>
                      <div className="text-xs opacity-50">
                        {consumer.lastName}
                      </div>
                      <div className="text-xs opacity-50">
                        ({consumer.phone})
                      </div>
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
