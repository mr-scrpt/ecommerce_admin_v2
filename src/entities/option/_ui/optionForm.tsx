"use client";
import { useAppearanceDelay } from "@/shared/lib/react";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Spinner } from "@/shared/ui/icons/spinner";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { cn } from "@/shared/ui/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { MinusIcon, PlusIcon } from "lucide-react";
import { FC, HTMLAttributes, useEffect } from "react";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { OptionDataTypeEnum } from "..";
import {
  OptionFormValues,
  optionFormSchema,
} from "../_domain/option/option.schema";
import { OptionRelation } from "../_domain/option/types";

interface OptionFormProps extends HTMLAttributes<HTMLFormElement> {
  option?: OptionRelation;
  handleSubmit?: (data: OptionFormValues) => void;
  isPending: boolean;
  submitText?: string;
}
type OptionFormType = FC<OptionFormProps> & {
  SubmitButton: FC<{}>;
  FieldOption: FC<{}>;
  FieldOptionsItem: FC<{}>;
};

const getDefaultValues = (option?: OptionRelation) => ({
  name: option?.name ?? "",
  datatype: option?.datatype ?? OptionDataTypeEnum.SELECT,
  optionItemList: option?.optionItemList ?? [{ name: "", value: "" }],
});

export const OptionForm: OptionFormType = (props) => {
  const {
    option,
    handleSubmit: onSubmit,
    submitText,
    isPending,
    children,
    className,
  } = props;

  const isPendingAppearance = useAppearanceDelay(isPending);

  const form = useForm<OptionFormValues>({
    resolver: zodResolver(optionFormSchema),
    defaultValues: {
      ...getDefaultValues(option),
      isPendingAppearance,
      submitText,
    },
  });

  useEffect(() => {
    form.reset({
      ...getDefaultValues(option),
      isPendingAppearance,
      submitText,
    });
  }, [option, form, isPendingAppearance, submitText]);

  const handleSubmit = form.handleSubmit(async (data) => {
    onSubmit?.(data);
  });

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={handleSubmit} className={cn(className, "w-full")}>
          {children}
        </form>
      </Form>
    </FormProvider>
  );
};

OptionForm.SubmitButton = function SubmitButton() {
  const form = useFormContext<OptionFormValues>();
  const { submitText, isPendingAppearance } = form.getValues();

  return (
    <Button type="submit" disabled={isPendingAppearance}>
      {isPendingAppearance && (
        <Spinner
          className="mr-2 h-4 w-4 animate-spin"
          aria-label="Profile updating..."
        />
      )}
      {submitText}
    </Button>
  );
};

OptionForm.FieldOption = function FieldOption() {
  const form = useFormContext<OptionFormValues>();

  const selectDataType = [
    { type: OptionDataTypeEnum.SELECT, value: "Select" },
    { type: OptionDataTypeEnum.MULT, value: "Multi select" },
    { type: OptionDataTypeEnum.CHECKBOX, value: "Checkbox" },
    { type: OptionDataTypeEnum.RADIO, value: "Radio" },
  ];

  return (
    <div className="flex w-full flex-col gap-2">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter option name..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="datatype"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Data type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a verified email to display" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {selectDataType.map((item) => (
                  <SelectItem key={item.type} value={item.type as string}>
                    {item.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>Select data type to this option</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

OptionForm.FieldOptionsItem = function FieldOptionsItem() {
  const form = useFormContext<OptionFormValues>();

  const { fields, append, remove } = useFieldArray({
    name: "optionItemList",
    control: form.control,
  });

  const { isPendingAppearance } = form.getValues();

  return (
    <div className="flex w-full flex-col gap-4">
      {fields.map((item, idx) => {
        return (
          <div key={item.id} className="flex w-full gap-4">
            <FormField
              control={form.control}
              name={`optionItemList.${idx}.name`}
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel>Option value name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPendingAppearance}
                      placeholder="Enter option name..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name={`optionItemList.${idx}.value`}
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel>Option value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPendingAppearance}
                      placeholder="Enter option name..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            {idx > 0 ? (
              <Button
                type="button"
                // onClick={() => }
                className="mb-0 mt-auto"
                variant="destructive"
                onClick={() => remove(idx)}
              >
                <MinusIcon size="10" />
              </Button>
            ) : (
              <Button
                type="button"
                disabled
                className="mb-0 mt-auto"
                variant="destructive"
              >
                <MinusIcon size="10" />
              </Button>
            )}
          </div>
        );
      })}

      <Button type="button" onClick={() => append({ name: "", value: "" })}>
        <PlusIcon size="15" /> Add option line
      </Button>
    </div>
  );
};
