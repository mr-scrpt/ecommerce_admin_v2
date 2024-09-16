import { useProfileListSearchToSelectModel } from "@/entities/profile/_vm/useProfileListSearchToSelect.model";
import { SEARCH_MIN_LENGTH } from "@/shared/config/constant";
import { DefaultSelectOption } from "@/shared/type/select";
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

interface ProfileSelectSearchElementProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  profileActive?: DefaultSelectOption;
  onSelectProfile: (profile: DefaultSelectOption) => void;
}

export const ProfileSelectSearchElement: FC<ProfileSelectSearchElementProps> = (
  props,
) => {
  const { onSelectProfile, profileActive } = props;

  const { profileListToSelect, isAppearancePending, toSearch, searchValue } =
    useProfileListSearchToSelectModel(profileActive?.value);

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

  const profileActiveItem = profileListToSelect.find(
    (profile) => profile.value === profileActive?.value,
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
                !profileActive?.value && "text-muted-foreground",
              )}
            >
              {profileActiveItem ? (
                <div className="flex w-full items-center gap-2">
                  <div className="left-0 grow text-left">
                    {profileActiveItem.name}
                  </div>
                  <div className="text-right text-xs opacity-50">
                    {profileActiveItem.lastName}
                  </div>
                  <div className="text-right text-xs opacity-50">
                    ({profileActiveItem.phone})
                  </div>
                </div>
              ) : (
                "Select profile"
              )}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[480px] p-0">
          <Command value={search} filter={() => 1}>
            <CommandInput
              placeholder="Search profile..."
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
                  : "Profile not found"}
              </CommandEmpty>
            )}
            <CommandList>
              {profileListToSelect.length !== 0 &&
                profileListToSelect.map((profile) => {
                  return (
                    <CommandItem
                      value={profile.value}
                      key={profile.value}
                      // disabled={profile.disabled || !profile.inStock}
                      onSelect={() => {
                        onSelectProfile({
                          label: profile.label,
                          value: profile.value,
                        });
                        setOpen(false);
                      }}
                      className="flex w-full items-center gap-2 text-sm"
                    >
                      <div className="grow">{profile.name}</div>
                      <div className="text-xs opacity-50">
                        {profile.lastName}
                      </div>
                      <div className="text-xs opacity-50">
                        ({profile.phone})
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
