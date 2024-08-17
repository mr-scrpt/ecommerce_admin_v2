"use client";
import { Button } from "@/shared/ui/button";
import { FormField, FormItem, FormLabel } from "@/shared/ui/form";
import { Spinner } from "@/shared/ui/icons/spinner";
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
  CategoryFormValues,
  categoryFormDefaultSchema,
} from "../../../_domain/form.schema";
import { CategoryBoardElement } from "./categoryBoardElement";
import { CategoryNameElement } from "./categoryNameElement";

interface CategoryFormProps<T extends CategoryFormValues>
  extends HTMLAttributes<HTMLFormElement> {
  categoryData?: T;
  handleSubmit?: (data: T) => void;
  defaultValues?: DefaultValues<T>;
  schema?: ZodTypeAny;
}

type CategoryFormElementsComponent = <
  T extends CategoryFormValues = CategoryFormValues,
>(
  props: CategoryFormProps<T>,
) => React.ReactElement;

type CategoryFormSubComponents = {
  FieldName: FC;
  FieldBoard: FC;
  SubmitButton: FC<{
    isPending: boolean;
    submitText: string;
    className?: string;
  }>;
};

type CategoryFormElementsType = CategoryFormElementsComponent &
  CategoryFormSubComponents;

const standartFieldsValues: CategoryFormValues = {
  name: "",
  board: [],
};

const getDefaultFormValues = <T extends CategoryFormValues>(
  defaultValues?: DefaultValues<T> | undefined,
): DefaultValues<T> => {
  return {
    ...standartFieldsValues,
    ...defaultValues,
  } as DefaultValues<T>;
};

export const CategoryFormElements: CategoryFormElementsType = <
  T extends CategoryFormValues,
>(
  props: CategoryFormProps<T>,
) => {
  const {
    categoryData,
    handleSubmit: onSubmit,
    schema,
    defaultValues,
    children,
  } = props;

  const form = useForm<T>({
    resolver: zodResolver(schema ?? categoryFormDefaultSchema),
    defaultValues: getDefaultFormValues<T>(defaultValues),
  });

  useEffect(() => {
    form.reset(getDefaultFormValues<T>(defaultValues));
  }, [categoryData, defaultValues, form]);

  const handleSubmit = form.handleSubmit(async (data: T) => {
    onSubmit?.(data);
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        {children}
      </form>
    </FormProvider>
  );
};

CategoryFormElements.FieldName = function FieldName() {
  const { control } = useFormContext<CategoryFormValues>();
  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Category name</FormLabel>
          <CategoryNameElement
            onChange={field.onChange}
            defaultValue={field.value}
          />
        </FormItem>
      )}
    />
  );
};

CategoryFormElements.FieldBoard = function FieldBoard() {
  const { control, setValue, getValues } = useFormContext<CategoryFormValues>();

  const handleDeleteBoard = (path: string) => {
    const list = getValues("board");
    const result = list.filter((item) => item !== path);
    setValue("board", result);
  };

  return (
    <FormField
      control={control}
      name="board"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Board</FormLabel>
          <CategoryBoardElement
            value={field.value}
            onChange={field.onChange}
            onDelete={handleDeleteBoard}
          />
        </FormItem>
      )}
    />
  );
};

CategoryFormElements.SubmitButton = function SubmitButton({
  isPending,
  submitText,
  className,
}) {
  return (
    <Button
      type="submit"
      disabled={isPending}
      className={className}
      aria-disabled={isPending}
    >
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
