"use client";
import { PropertySelectElement } from "@/entities/property";
import { Category } from "@/kernel/domain/category/category.type";
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
} from "../../_domain/form.schema";
import { CategoryBoardElement } from "./categoryBoardElement";
import { CategoryNameElement } from "./categoryNameElement";

interface CategoryFormProps<T extends CategoryFormValues>
  extends HTMLAttributes<HTMLFormElement> {
  categoryData?: Category;
  handleSubmit?: (data: T) => void;
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

// const getDefaultValues = (category?: Category) => ({
//   name: category?.name ?? "",
//   board: category?.board ?? [],
// });
function getDefaultValues<T extends { name: string; board: string[] }>(
  category?: Category,
): T;
function getDefaultValues(category?: Category) {
  return {
    name: category?.name ?? "",
    board: category?.board ?? [],
  };
}
// const getDefaultValues = <T extends { name: string; board: string[] }>(category?: Category): Partial<T> => ({
//   name: category?.name ?? "",
//   board: category?.board ?? [],
// });
export const CategoryFormElements: CategoryFormElementsType = <
  T extends CategoryFormValues,
>(
  props: CategoryFormProps<T>,
) => {
  const { categoryData, handleSubmit: onSubmit, schema, children } = props;

  const form = useForm<T>({
    resolver: zodResolver(schema ?? categoryFormDefaultSchema),
    // defaultValues: getDefaultValues(categoryData) as T,
    defaultValues: getDefaultValues(
      categoryData,
    ) as unknown as DefaultValues<T>,
  });

  useEffect(() => {
    form.reset(getDefaultValues(categoryData) as T);
  }, [categoryData, form]);

  const handleSubmit = form.handleSubmit(async (data: T) => {
    onSubmit?.(data);
  });
  console.log("output_log: form errors =>>>", form.formState.errors);

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
          <CategoryNameElement onChange={field.onChange} />
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
