"use client";
import { useSettlemetListToSelect } from "@/entities/settlement";
import { ReceiverFormDefaultValues } from "@/entities/receiver";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { useReceiverCreateMutation } from "../_mutation/useReceiverCreate.mutation";
import { ReceiverCreateFormLayout } from "./receiverCreateFormLayout";

interface ReceiverCreateFormProps extends HTMLAttributes<HTMLDivElement> {
  userId: string;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

export const ReceiverCreateForm: FC<ReceiverCreateFormProps> = (props) => {
  const { userId, callbackUrl, className, onSuccess } = props;

  // const [selectedSettlement, setSelectedSettlement] = useState<string>("");

  const router = useRouter();

  const { receiverCreate, isPending: isPendingCreate } =
    useReceiverCreateMutation();

  const {
    toSearch,
    settlementListToSelect,
    isAppearancePending,
    isSuccess: isSuccessReceiver,
  } = useSettlemetListToSelect();

  const isPendingComplexible = isAppearancePending || isPendingCreate;

  if (isPendingComplexible) {
    return <Spinner aria-label="Loading profile..." />;
  }

  const handleSubmit = async (data: ReceiverFormDefaultValues) => {
    await receiverCreate({
      receiverData: {
        ...data,
        userId,
      },
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  return (
    <div className={cn(className, "w-full")}>
      <ReceiverCreateFormLayout
        handleSubmit={handleSubmit}
        toSearch={toSearch}
        isPending={isPendingComplexible}
        submitText={"Save change"}
      />
    </div>
  );
};
