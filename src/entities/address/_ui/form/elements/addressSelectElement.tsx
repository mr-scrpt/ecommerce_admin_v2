import { FC, HTMLAttributes } from "react";

import { useAddressListByUserAndSettlementRefToSelectModel } from "@/entities/address/_vm/useAddressListByUserAndSettlementRefToSelect.model";
import { AddressDefaultSelectOption } from "@/kernel/domain/address/form.schema";
import { Spinner } from "@/shared/ui/icons/spinner";
import { SelectElement } from "@/shared/ui/select/selectElement";

export interface AddressSelectProps extends HTMLAttributes<HTMLDivElement> {
  userId: string;
  settlementRef?: string;
  addressActive?: AddressDefaultSelectOption;
  onSelectAddress: (addressList: Array<AddressDefaultSelectOption>) => void;
}
export const AddressSelectElement: FC<AddressSelectProps> = (props) => {
  const { addressActive, userId, settlementRef, onSelectAddress } = props;

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

  if (!isFetchedAfterMount || isAppearancePending || !isSuccess) {
    return <Spinner />;
  }

  return (
    <SelectElement
      optionActive={addressActive}
      onSelect={onSelectAddress}
      optionList={addressListToSelect}
      placeholder={placeholder}
    />
  );
};
