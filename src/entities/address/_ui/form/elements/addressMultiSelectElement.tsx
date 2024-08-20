import { FC, HTMLAttributes } from "react";

import { useAddressListByUserAndSettlementRefToSelectModel } from "@/entities/address/_vm/useAddressListByUserAndSettlementRefToSelect.model";
import { SelectOptionItem } from "@/shared/type/select";
import { Spinner } from "@/shared/ui/icons/spinner";
import { MultiSelectElement } from "@/shared/ui/select/multiSelectElement";

export interface AddressMultiSelectProps
  extends HTMLAttributes<HTMLDivElement> {
  userId: string;
  settlementRef: string;
  addressListActive?: Array<SelectOptionItem>;
  onSelectAddress: (addressList: Array<SelectOptionItem>) => void;
}
export const AddressMultiSelectElement: FC<AddressMultiSelectProps> = (
  props,
) => {
  const { addressListActive, userId, settlementRef, onSelectAddress } = props;

  // const [dafaultValue] = addressListActive || [];

  const {
    addressListToSelect,
    isAppearancePending,
    isSuccess,
    isFetchedAfterMount,
  } = useAddressListByUserAndSettlementRefToSelectModel({
    userId,
    settlementRef,
  });

  const placeholder = isAppearancePending
    ? "Loading..."
    : "MultiSelect address";

  if (!isFetchedAfterMount || isAppearancePending) {
    return <Spinner />;
  }

  return (
    <MultiSelectElement
      optionList={addressListToSelect}
      optionActiveList={addressListActive}
      onSelect={onSelectAddress}
    />
  );
  // return (
  //   <MultiSelect
  //     defaultValue={addressInit || ""}
  //     onValueChange={onMultiSelectAddress}
  //     disabled={!addressListToMultiSelect.length}
  //   >
  //     <FormControl>
  //       <MultiSelectTrigger>
  //         <MultiSelectValue placeholder={placeholder} />
  //       </MultiSelectTrigger>
  //     </FormControl>
  //     <MultiSelectContent>
  //       {addressListToMultiSelect.map((address) => (
  //         <MultiSelectItem key={address.value} value={address.value}>
  //           {address.label}
  //         </MultiSelectItem>
  //       ))}
  //     </MultiSelectContent>
  //   </MultiSelect>
  // );
};
