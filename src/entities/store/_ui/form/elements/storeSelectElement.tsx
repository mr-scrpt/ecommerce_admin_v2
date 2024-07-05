import { FormControl } from "@/shared/ui/form";
import { FC } from "react";

import { StoreSelectProps } from "@/kernel/domain/store/ui.type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { useStoreListBySettltmentRefToSelectModel } from "../../../_vm/useStoreListBySettltmentRefToSelect.model";

export const StoreSelectElement: FC<StoreSelectProps> = (props) => {
  const { storeInit, settlementRef, onSelectStore } = props;

  const { storeListToSelect, isPending, isSuccess } =
    useStoreListBySettltmentRefToSelectModel(settlementRef);

  const placeholder = isPending ? "Loading..." : "Select store";

  return (
    <Select defaultValue={storeInit} onValueChange={onSelectStore}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {storeListToSelect.map((store) => (
          <SelectItem key={store.value} value={store.value}>
            {store.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
