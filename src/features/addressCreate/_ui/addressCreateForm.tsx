"use client";
import { useSettlemetListToSelect } from "@/entities/settlement";
import { AddressFormDefaultValues } from "@/entities/address";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { useAddressCreateMutation } from "../_mutation/useAddressCreate.mutation";
import { AddressCreateFormLayout } from "./addressCreateFormLayout";

interface AddressCreateFormProps extends HTMLAttributes<HTMLDivElement> {
  userId: string;
  settlementRef: string;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

export const AddressCreateForm: FC<AddressCreateFormProps> = (props) => {
  const { userId, settlementRef, callbackUrl, className, onSuccess } = props;

  // const [selectedSettlement, setSelectedSettlement] = useState<string>("");

  const router = useRouter();

  const { addressCreate, isPending: isPendingCreate } =
    useAddressCreateMutation();

  const {
    toSearch,
    settlementListToSelect,
    isAppearancePending,
    isSuccess: isSuccessAddress,
  } = useSettlemetListToSelect();

  const isPendingComplexible = isAppearancePending || isPendingCreate;

  if (isPendingComplexible) {
    return <Spinner aria-label="Loading profile..." />;
  }

  const handleSubmit = async (data: AddressFormDefaultValues) => {
    console.log("output_log: data =>>>", data);
    await addressCreate({
      addressData: {
        ...data,
        userId,
        settlementRef,
      },
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  return (
    <div className={cn(className, "w-full")}>
      <AddressCreateFormLayout
        handleSubmit={handleSubmit}
        toSearch={toSearch}
        isPending={isPendingComplexible}
        submitText={"Save change"}
      />
    </div>
  );
};
