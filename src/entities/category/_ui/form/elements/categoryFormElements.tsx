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
  CategoryFormDefaultValues,
  categoryFormDefaultSchema,
} from "../../../_domain/form.schema";
import { CategoryBoardElement } from "./categoryBoardElement";
import { CategoryNameElement } from "./categoryNameElement";
import { CategoryMultiSelectElement } from "./categoryMultiSelectElement";
import { CategorySelectElement } from "./categorySelectElement";

interface CategoryFormElementsProps<T extends CategoryFormDefaultValues>
  extends HTMLAttributes<HTMLFormElement> {
  handleSubmit?: (data: T) => void;
  defaultValues?: DefaultValues<T>;
  schema?: ZodTypeAny;
}

type CategoryFormElementsComponent = <
  T extends CategoryFormDefaultValues = CategoryFormDefaultValues,
>(
  props: CategoryFormElementsProps<T>,
) => React.ReactElement;

type CategoryFormSubComponents = {
  FieldName: FC;
  FieldBoard: FC;
  FieldCategoryMultiSelect: FC;
  FieldCategorySelect: FC;
  SubmitButton: FC<{
    isPending: boolean;
    submitText: string;
    className?: string;
  }>;
};

type CategoryFormElementsType = CategoryFormElementsComponent &
  CategoryFormSubComponents;

const standartFieldsValues: CategoryFormDefaultValues = {
  name: "",
  board: [],
  categoryList: [],
};

const getDefaultFormValues = <T extends CategoryFormDefaultValues>(
  defaultValues?: DefaultValues<T> | undefined,
): DefaultValues<T> => {
  return {
    ...standartFieldsValues,
    ...defaultValues,
  } as DefaultValues<T>;
};

export const CategoryFormElements: CategoryFormElementsType = <
  T extends CategoryFormDefaultValues,
>(
  props: CategoryFormElementsProps<T>,
) => {
  const { handleSubmit: onSubmit, schema, defaultValues, children } = props;

  const form = useForm<T>({
    resolver: zodResolver(schema ?? categoryFormDefaultSchema),
    defaultValues: getDefaultFormValues<T>(defaultValues),
  });

  useEffect(() => {
    form.reset(getDefaultFormValues<T>(defaultValues));
  }, [defaultValues, form]);

  const handleSubmit = form.handleSubmit(async (data: T) => {
    onSubmit?.(data);
  });

  console.log("output_log: values =>>>", form.getValues());

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        {children}
      </form>
    </FormProvider>
  );
};

CategoryFormElements.FieldName = function FieldName() {
  const { control } = useFormContext<CategoryFormDefaultValues>();
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
  const { control, setValue, getValues } =
    useFormContext<CategoryFormDefaultValues>();

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

CategoryFormElements.FieldCategoryMultiSelect = function FieldCategorySelect() {
  const { control } = useFormContext<CategoryFormDefaultValues>();

  return (
    <FormField
      control={control}
      name="categoryList"
      render={({ field }) => {
        console.log("output_log: multiselect =>>>", field.value);
        return (
          <FormItem>
            <FormLabel>Category list</FormLabel>
            <CategoryMultiSelectElement
              categoryListActive={field.value}
              onSelectCategory={field.onChange}
            />
          </FormItem>
        );
      }}
    />
  );
};

CategoryFormElements.FieldCategorySelect = function FieldCategorySelect() {
  const { control } = useFormContext<CategoryFormDefaultValues>();

  return (
    <FormField
      control={control}
      name="categoryList"
      render={({ field }) => {
        console.log("output_log: select =>>>", field.value);
        return (
          <FormItem>
            <FormLabel>Category list</FormLabel>
            <CategorySelectElement
              categoryActive={field.value[0]}
              onSelectCategory={field.onChange}
            />
          </FormItem>
        );
      }}
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
