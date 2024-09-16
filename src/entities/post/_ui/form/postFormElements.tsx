"use client";
import { ButtonSubmitComponentType } from "@/shared/type/button";
import { Button } from "@/shared/ui/button";
import { FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HTMLAttributes, useEffect } from "react";
import {
  DefaultValues,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import { ZodTypeAny } from "zod";
import {
  PostFormDefaultValues,
  postDefaultFieldsValues,
  postFormDefaultSchema,
} from "../../_domain/form.schema";
import { PostMultiSelectElement } from "./elements/postMultiSelectElement";
import { PostSelectElement } from "./elements/postSelectElement";

interface PostFormElementsProps<T extends PostFormDefaultValues>
  extends HTMLAttributes<HTMLFormElement> {
  handleSubmit?: (data: T) => void;
  defaultValues?: DefaultValues<T>;
  schema?: ZodTypeAny;
}

type PostFormElementsComponent = <
  T extends PostFormDefaultValues = PostFormDefaultValues,
>(
  props: PostFormElementsProps<T>,
) => React.ReactElement;

type PostFormFields = {
  FieldPostSelect: FC<PostFormSelectProps>;
  FieldPostMultiSelect: FC<PostFormSelectProps>;
  SubmitButton: ButtonSubmitComponentType;
};

type PostFormElementsType = PostFormElementsComponent & PostFormFields;

const getDefaultFormValues = <T extends PostFormDefaultValues>(
  defaultValues?: DefaultValues<T> | undefined,
): DefaultValues<T> => {
  return {
    ...postDefaultFieldsValues,
    ...defaultValues,
  } as DefaultValues<T>;
};

export const PostFormElements: PostFormElementsType = <
  T extends PostFormDefaultValues,
>(
  props: PostFormElementsProps<T>,
) => {
  const { defaultValues, handleSubmit: onSubmit, schema, children } = props;

  const form = useForm<T>({
    resolver: zodResolver(schema ?? postFormDefaultSchema),
    defaultValues: { ...getDefaultFormValues<T>(defaultValues) },
  });

  useEffect(() => {
    form.reset(getDefaultFormValues<T>(defaultValues));
  }, [defaultValues, form]);

  const handleSubmit = form.handleSubmit(async (data: T) => {
    onSubmit?.(data);
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        {children}
        <FormMessage />
      </form>
    </FormProvider>
  );
};

interface PostFormSelectProps {
  settlementRef: string;
}

PostFormElements.FieldPostSelect = function FieldPostSelect(
  props: PostFormSelectProps,
) {
  const { settlementRef } = props;
  const { control } = useFormContext<PostFormDefaultValues>();

  return (
    <FormField
      control={control}
      name="postOfficeList"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Post list</FormLabel>
          <PostSelectElement
            onSelectPost={field.onChange}
            settlementRef={settlementRef}
            postActive={field.value?.[0]}
          />
        </FormItem>
      )}
    />
  );
};

PostFormElements.FieldPostMultiSelect = function FieldPostMultiSelect(
  props: PostFormSelectProps,
) {
  const { settlementRef } = props;
  const { control, getFieldState } = useFormContext<PostFormDefaultValues>();

  if (!getFieldState("postOfficeList")) return null;

  return (
    <FormField
      control={control}
      name="postOfficeList"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Select post list</FormLabel>
          <PostMultiSelectElement
            postListActive={field.value}
            onSelectPost={field.onChange}
            settlementRef={settlementRef}
          />
          {/* <FormMessage /> */}
        </FormItem>
      )}
    />
  );
};

PostFormElements.SubmitButton = function SubmitButton({
  isPending,
  submitText,
  className,
}) {
  return (
    <Button type="submit" disabled={isPending} className={cn(className)}>
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
