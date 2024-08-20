"use client";
import { ButtonSubmitComponentType } from "@/shared/type/button";
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
import { MinusIcon, PlusIcon } from "lucide-react";
import { FC, HTMLAttributes, useEffect } from "react";
import {
  DefaultValues,
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { ZodTypeAny } from "zod";
import {
  PropertyItemFormDefaultValues,
  propertyItemFormSchema,
} from "../../../_domain/propertyItem/form.schema";
import { PropertyItemNameElement } from "./elements/propertyItemNameElement";
import { PropertyItemValueElement } from "./elements/propertyItemValueElement";

interface PropertyItemFormElementsProps<T extends PropertyItemFormDefaultValues>
  extends HTMLAttributes<HTMLFormElement> {
  handleSubmit?: (data: T) => void;
  defaultValues?: DefaultValues<T>;
  schema?: ZodTypeAny;
}

type PropertyItemFormElementsComponent = <
  T extends PropertyItemFormDefaultValues = PropertyItemFormDefaultValues,
>(
  props: PropertyItemFormElementsProps<T>,
) => React.ReactElement;

type PropertyItemFormFields = {
  FieldPropertyItemList: FC;

  SubmitButton: ButtonSubmitComponentType;
};

type PropertyFormElementsType = PropertyItemFormElementsComponent &
  PropertyItemFormFields;

const standartFieldsValues: PropertyItemFormDefaultValues = {
  propertyItemList: [{ label: "", value: "", id: "" }],
};

const getDefaultFormValues = <T extends PropertyItemFormDefaultValues>(
  defaultValues?: DefaultValues<T> | undefined,
): DefaultValues<T> => {
  return {
    ...standartFieldsValues,
    ...defaultValues,
  } as DefaultValues<T>;
};

export const PropertyItemFormElements: PropertyFormElementsType = <
  T extends PropertyItemFormDefaultValues,
>(
  props: PropertyItemFormElementsProps<T>,
) => {
  const { handleSubmit: onSubmit, schema, defaultValues, children } = props;

  const form = useForm<T>({
    resolver: zodResolver(schema ?? propertyItemFormSchema),
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
      <Form {...form}>
        <form onSubmit={handleSubmit} className={"space-y-8"}>
          {children}
        </form>
      </Form>
    </FormProvider>
  );
};

PropertyItemFormElements.FieldPropertyItemList =
  function FieldPropertyItemList() {
    const form = useFormContext<PropertyItemFormDefaultValues>();

    const { fields, append, remove } = useFieldArray({
      name: "propertyItemList",
      control: form.control,
    });

    return (
      <div className="flex w-full flex-col gap-4">
        {fields.map((item, idx) => {
          return (
            <div key={item.id} className="flex w-full gap-4">
              <FormField
                control={form.control}
                name={`propertyItemList.${idx}.label`}
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormLabel>Property name</FormLabel>
                    <PropertyItemNameElement
                      onChange={field.onChange}
                      defaultValue={field.value}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name={`propertyItemList.${idx}.value`}
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormLabel>Property value</FormLabel>
                    <PropertyItemValueElement
                      onChange={field.onChange}
                      defaultValue={field.value}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              {idx > 0 ? (
                <Button
                  type="button"
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

        <Button
          type="button"
          onClick={() => append({ label: "", value: "", id: "" })}
        >
          <PlusIcon size="15" /> Add property line
        </Button>
      </div>
    );
  };

PropertyItemFormElements.SubmitButton = function SubmitButton({
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
