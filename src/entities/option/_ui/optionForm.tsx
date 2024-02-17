"use client";
import { useAppearanceDelay } from "@/shared/lib/react";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Spinner } from "@/shared/ui/icons/spinner";
import { Input } from "@/shared/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HTMLAttributes, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  OptionFormValues,
  optionFormSchema,
} from "../_domain/option/option.schema";
import { Option } from "../_domain/types";
import { OptionDataTypeEnum } from "..";

interface OptionFormProps extends HTMLAttributes<HTMLFormElement> {
  option?: Option;
  handleSubmit?: (data: OptionFormValues) => void;
  isPending: boolean;
  submitText?: string;
}

const getDefaultValues = (option?: Option) => ({
  name: option?.name ?? "",
  datatype: option?.datatype ?? OptionDataTypeEnum.SELECT,
});

export const OptionForm: FC<OptionFormProps> = (props) => {
  const { option, handleSubmit: onSubmit, submitText, isPending } = props;

  const form = useForm<OptionFormValues>({
    resolver: zodResolver(optionFormSchema),
    defaultValues: getDefaultValues(option),
  });

  useEffect(() => {
    form.reset(getDefaultValues(option));
  }, [option, form]);

  const handleSubmit = form.handleSubmit(async (data) => {
    onSubmit?.(data);
  });

  const isPendingAppearance = useAppearanceDelay(isPending);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
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
        <Button type="submit" disabled={isPendingAppearance}>
          {isPendingAppearance && (
            <Spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-label="Profile updating..."
            />
          )}
          {submitText}
        </Button>
      </form>
    </Form>
  );
};
