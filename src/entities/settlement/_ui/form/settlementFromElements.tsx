import { ButtonSubmitComponentType } from "@/shared/type/button";
import { Button } from "@/shared/ui/button";
import { Form, FormField, FormItem, FormLabel } from "@/shared/ui/form";
import { Spinner } from "@/shared/ui/icons/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HTMLAttributes } from "react";
import {
  DefaultValues,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import { ZodTypeAny } from "zod";
import {
  SettlementFormDefaultValues,
  settlementFormDefaultSchema,
} from "../../_domain/form.schema";
import { SettlementSelectElement } from "./elements/settlementSelectElement";
import { SettlementMultiSelectElement } from "./elements/settlementMultiSelectElement";
import { SettlementSelectSearchElement } from "./elements/settlementSelectSearchElement";

// interface SettlementFromElementsProps extends HTMLAttributes<HTMLFormElement> {
//   settlementData?: Settlement["ref"];
//   handleSubmit?: (data: SettlementFormValues) => void;
// }
//
// interface SubmitButtonProps {
//   isPending: boolean;
//   submitText: string;
// }
//
// interface SettlementListProps extends HTMLAttributes<HTMLFormElement> {
//   onSelectSettlement: (settlement: Settlement["ref"]) => void;
// }
//
// type SettlementFormType = FC<SettlementFromElementsProps> & {
//   ButtonSubmit: FC<SubmitButtonProps>;
//   FieldSettlementSelect: FC<SettlementListProps>;
// };
//
// const getDefaultValues = (settlementRef?: Settlement["ref"]) => ({
//   settlementRef: settlementRef ?? "",
// });

interface SettlementFormElementsProps<T extends SettlementFormDefaultValues>
  extends HTMLAttributes<HTMLFormElement> {
  handleSubmit?: (data: T) => void;
  defaultValues?: DefaultValues<T>;
  schema?: ZodTypeAny;
}

type SettlementFormElementsComponent = <
  T extends SettlementFormDefaultValues = SettlementFormDefaultValues,
>(
  props: SettlementFormElementsProps<T>,
) => React.ReactElement;

type SettlementFormFields = {
  FieldSettlementSelectSearch: FC;
  SubmitButton: ButtonSubmitComponentType;
};

type SettlementFormElementsType = SettlementFormElementsComponent &
  SettlementFormFields;

const standartFieldsValues: SettlementFormDefaultValues = {
  settlement: { label: "", value: "" },
};

const getDefaultFormValues = <T extends SettlementFormDefaultValues>(
  defaultValues?: DefaultValues<T> | undefined,
): DefaultValues<T> => {
  return {
    ...standartFieldsValues,
    ...defaultValues,
  } as DefaultValues<T>;
};

export const SettlementFormElements: SettlementFormElementsType = <
  T extends SettlementFormDefaultValues,
>(
  props: SettlementFormElementsProps<T>,
) => {
  const { handleSubmit: onSubmit, schema, defaultValues, children } = props;

  const form = useForm<T>({
    resolver: zodResolver(schema ?? settlementFormDefaultSchema),
    defaultValues: { ...getDefaultFormValues<T>(defaultValues) },
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

SettlementFormElements.FieldSettlementSelectSearch =
  function FieldSettlementSelect() {
    const { control, getFieldState } =
      useFormContext<SettlementFormDefaultValues>();

    if (!getFieldState("settlement")) return null;

    return (
      <FormField
        control={control}
        name="settlement"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Settlement search to select</FormLabel>
              <SettlementSelectSearchElement
                settlementActive={field.value}
                onSelectSettlement={field.onChange}
              />
            </FormItem>
          );
        }}
      />
    );
  };

SettlementFormElements.SubmitButton = function ButtonSubmit({
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
