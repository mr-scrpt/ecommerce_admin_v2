import { StaffFormElements, useStaffQuery } from "@/entities/staff";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import {
  StaffUpdateFormValues,
  staffUpdateFormSchema,
} from "../_domain/form.schema";
import { useStaffUpdateModel } from "../_vm/useStaffUpdate.model";

interface StaffFormProps extends HTMLAttributes<HTMLDivElement> {
  staffId: string;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

export const StaffFormUpdate: FC<StaffFormProps> = (props) => {
  const { staffId, callbackUrl, className, onSuccess } = props;

  const {
    isPending: isPendingStaff,
    isFetchedAfterMount,
    staff,
  } = useStaffQuery(staffId);

  const router = useRouter();

  const { staffUpdate, isPending: isPendingUpdate } = useStaffUpdateModel();

  const isPendingComplexible =
    isPendingUpdate || isPendingStaff || !isFetchedAfterMount;

  if (isPendingComplexible) {
    return <Spinner aria-label="Loading profile..." />;
  }

  if (!staff) {
    return <div>Failed to load staff, you may not have permissions</div>;
  }

  const handleSubmit = async (staffData: StaffUpdateFormValues) => {
    // const {} = data.
    await staffUpdate({
      selector: { id: staffId },
      staffData,
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  return (
    <div className={cn(className, "w-full")}>
      <StaffFormElements
        handleSubmit={handleSubmit}
        staff={staff}
        schema={staffUpdateFormSchema}
      >
        <StaffFormElements.FieldEmail />
        <StaffFormElements.FieldName />
        <StaffFormElements.FieldLastName />
        <StaffFormElements.FieldPhone />
        {/* <StaffFormElements.FieldAvatar staff={data.staff} /> */}
        <StaffFormElements.SubmitButton
          isPending={isPendingComplexible}
          submitText="Save change"
        />
      </StaffFormElements>
    </div>
  );
};
