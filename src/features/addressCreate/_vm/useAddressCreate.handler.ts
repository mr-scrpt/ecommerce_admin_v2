import { useRouter } from "next/navigation";
import { AddressCreateFormValues } from "../_domain/form.schema";
import { useAddressCreateMutation } from "../_mutation/useAddressCreate.mutation";

interface AddressFormCreateProps {
  userId: string;
  settlementRef: string;
  callbackUrl?: string;
  onSuccess?: () => void;
}
export const useAddressCreateHandler = (props: AddressFormCreateProps) => {
  const { userId, settlementRef, onSuccess, callbackUrl } = props;
  const {
    addressCreate,
    isPending: isPendingCreate,
    isSuccess: isSuccessCreate,
  } = useAddressCreateMutation();

  const router = useRouter();

  const handleAddressCreate = async (data: AddressCreateFormValues) => {
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

  return {
    handleAddressCreate,
    isPendingCreate,
    isSuccessCreate,
  };
};
