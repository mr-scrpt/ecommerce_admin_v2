import { Settlement } from "@/kernel/domain/settlement/settlement.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HTMLAttributes } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { SettleToSelect } from "../_domain/ui.type";
import {
  SettlementFormValues,
  settlementFormSchema,
} from "../_domain/form.schema";
import { Button } from "@/shared/ui/button";
import { Spinner } from "@/shared/ui/icons/spinner";
import { Form, FormField, FormItem, FormLabel } from "@/shared/ui/form";
import { SettlementSelect } from "./settlementSelect";

interface SettlementFromElementsProps extends HTMLAttributes<HTMLFormElement> {
  settlementList: Array<SettleToSelect>;
  handleSubmit: (data: SettlementFormValues) => void;
}

interface SubmitButtonProps {
  isPending: boolean;
  submitText: string;
}

type SettlementFormType = FC<SettlementFromElementsProps> & {
  SubmitButton: FC<SubmitButtonProps>;
  SettlementList: FC;
};

const getDefaultValues = (settlementList: Array<SettleToSelect>) => ({
  settlementList,
});

export const SettlementFromElements: SettlementFormType = (props) => {
  const { settlementList, handleSubmit: onSubmit, children } = props;

  const form = useForm<SettlementFormValues>({
    resolver: zodResolver(settlementFormSchema),
    defaultValues: getDefaultValues(settlementList),
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

SettlementFromElements.SettlementList = function SettlementList() {
  const form = useFormContext<SettlementFormValues>();
  return (
    <FormField
      control={form.control}
      name="settlementList"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Select settlement</FormLabel>
          <SettlementSelect />
        </FormItem>
      )}
    />
  );
};

SettlementFromElements.SubmitButton = function SubmitButton({
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
