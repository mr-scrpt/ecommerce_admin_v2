import { Settlement } from "@/kernel/domain/settlement/settlement.type";
import { Button } from "@/shared/ui/button";
import { Form, FormField, FormItem, FormLabel } from "@/shared/ui/form";
import { Spinner } from "@/shared/ui/icons/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HTMLAttributes } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import {
  SettlementFormValues,
  settlementFormSchema,
} from "../../../_domain/form.schema";
import { SettlementSelectElement } from "./settlementSelectElement";

interface SettlementFromElementsProps extends HTMLAttributes<HTMLFormElement> {
  settlementInit: Settlement["ref"];
  handleSubmit?: (data: SettlementFormValues) => void;
}

interface SubmitButtonProps {
  isPending: boolean;
  submitText: string;
}

interface SettlementListProps extends HTMLAttributes<HTMLFormElement> {
  onSelectSettlement: (settlement: Settlement["ref"]) => void;
}

type SettlementFormType = FC<SettlementFromElementsProps> & {
  ButtonSubmit: FC<SubmitButtonProps>;
  FieldSettlementSelect: FC<SettlementListProps>;
};

const getDefaultValues = (settlementRef: Settlement["ref"]) => ({
  settlementRef,
});

export const SettlementFromElements: SettlementFormType = (props) => {
  const { settlementInit, handleSubmit: onSubmit, children } = props;

  const form = useForm<SettlementFormValues>({
    resolver: zodResolver(settlementFormSchema),
    defaultValues: getDefaultValues(settlementInit),
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    onSubmit?.(data);
  });

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="w-full space-y-8">
          {children}
        </form>
      </Form>
    </FormProvider>
  );
};

SettlementFromElements.FieldSettlementSelect = function FieldSettlementSelect(
  props,
) {
  // const { onSelectSettlement } = props;

  const form = useFormContext<SettlementFormValues>();
  return (
    <FormField
      control={form.control}
      name="settlementRef"
      render={({ field }) => {
        return (
          <FormItem className="flex flex-col">
            <FormLabel>Select settlement</FormLabel>
            <SettlementSelectElement
              settlementActive={field.value}
              onSelectSettlement={field.onChange}
              // onSelectSettlement={onSelectSettlement}
            />
          </FormItem>
        );
      }}
    />
  );
};

SettlementFromElements.ButtonSubmit = function ButtonSubmit({
  isPending,
  submitText,
}: {
  isPending: boolean;
  submitText: string;
}) {
  return (
    <Button type="submit" disabled={isPending}>
      {isPending && (
        <Spinner
          className="mr-2 h-4 w-4 animate-spin"
          aria-label="Profile updating..."
        />
      )}
      {submitText}
    </Button>
  );
};
