import { FormControl } from "@/shared/ui/form";
import { FC } from "react";

import { useAddressListByUserAndSettlementRefToSelectModel } from "@/entities/address/_vm/useAddressListByUserAndSettlementRefToSelect.model";
import { AddressSelectProps } from "@/kernel/domain/address/ui.type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Spinner } from "@/shared/ui/icons/spinner";

export const AddressSelectElement: FC<AddressSelectProps> = (props) => {
  const { addressInit, userId, settlementRef, onSelectAddress } = props;

  const {
    addressListToSelect,
    isAppearancePending,
    isSuccess,
    isFetchedAfterMount,
  } = useAddressListByUserAndSettlementRefToSelectModel({
    userId,
    settlementRef,
  });

  const placeholder = isAppearancePending ? "Loading..." : "Select address";

  if (!isFetchedAfterMount || isAppearancePending) {
    return <Spinner />;
  }

  return (
    <Select
      defaultValue={addressInit || ""}
      onValueChange={onSelectAddress}
      disabled={!addressListToSelect.length}
    >
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {addressListToSelect.map((address) => (
          <SelectItem key={address.value} value={address.value}>
            {address.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
