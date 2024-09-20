"use client";
import { ButtonSubmitComponentType } from "@/shared/type/button";
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
  propertyItemDefaultFieldsValues,
  propertyItemEmptyRow,
  propertyItemFormSchema,
} from "../../../_domain/propertyItem/form.schema";
import { PropertyItemNameElement } from "./elements/propertyItemNameElement";
import { PropertyItemValueElement } from "./elements/propertyItemValueElement";
import { PropertyItemSelectElement } from "./elements/propertyItemSelectElement";
import { PropertyItemMultiSelectElement } from "./elements/propertyItemMultiSelectElement";
import { PropertyItemRadioElement } from "./elements/propertyItemRadioElement";
import { PropertyItemCheckboxElement } from "./elements/propertyItemCheckboxElement";
import { usePropertyItemListToSelectModel } from "@/entities/property";
import { Checkbox } from "@/shared/ui/checkbox";
import { PropertyItemDefaultSelectOption } from "@/kernel/domain/property/form.schema";

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

interface PropertyItemElementProps {
  propertyId: string;
}

type PropertyItemFormFields = {
  FieldPropertyItemList: FC;
  FieldPropertyItemSelect: FC<PropertyItemElementProps>;
  FieldPropertyItemMultiSelect: FC<PropertyItemElementProps>;
  FieldPropertyItemRadio: FC<PropertyItemElementProps>;
  FieldPropertyItemCheckbox: FC<PropertyItemElementProps>;

  SubmitButton: ButtonSubmitComponentType;
};

type PropertyFormElementsType = PropertyItemFormElementsComponent &
  PropertyItemFormFields;

const getDefaultFormValues = <T extends PropertyItemFormDefaultValues>(
  defaultValues?: DefaultValues<T> | undefined,
): DefaultValues<T> => {
  return {
    ...propertyItemDefaultFieldsValues,
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
// TODO: Move to separate file
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

        <Button type="button" onClick={() => append(propertyItemEmptyRow)}>
          <PlusIcon size="15" /> Add property line
        </Button>
      </div>
    );
  };

PropertyItemFormElements.FieldPropertyItemSelect =
  function FieldPropertyItemSelect(props: PropertyItemElementProps) {
    const { propertyId } = props;
    const { control, getFieldState } =
      useFormContext<PropertyItemFormDefaultValues>();

    if (!getFieldState("propertyItemList")) return null;

    return (
      <FormField
        control={control}
        name="propertyItemList"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>PropertyItem</FormLabel>
              <PropertyItemSelectElement
                // propertyItemActive={activeItem}
                propertyItemListActive={field.value}
                onSelectPropertyItem={field.onChange}
                propertyId={propertyId}
              />
              {/* <FormMessage /> */}
            </FormItem>
          );
        }}
      />
    );
  };

PropertyItemFormElements.FieldPropertyItemMultiSelect =
  function FieldPropertyItemMultiSelect(props: PropertyItemElementProps) {
    const { propertyId } = props;
    const { control, getFieldState } =
      useFormContext<PropertyItemFormDefaultValues>();

    if (!getFieldState("propertyItemList")) return null;

    return (
      <FormField
        control={control}
        name="propertyItemList"
        render={({ field }) => (
          <FormItem>
            <FormLabel>PropertyItem</FormLabel>
            <PropertyItemMultiSelectElement
              propertyItemListActive={field.value}
              onSelectPropertyItem={field.onChange}
              propertyId={propertyId}
            />
            {/* <FormMessage /> */}
          </FormItem>
        )}
      />
    );
  };

PropertyItemFormElements.FieldPropertyItemRadio =
  function FieldPropertyItemRadio(props: PropertyItemElementProps) {
    const { propertyId } = props;
    const { control, getFieldState } =
      useFormContext<PropertyItemFormDefaultValues>();

    if (!getFieldState("propertyItemList")) return null;

    return (
      <FormField
        control={control}
        name="propertyItemList"
        render={({ field }) => (
          <FormItem>
            <FormLabel>PropertyItem</FormLabel>
            <PropertyItemRadioElement
              propertyItemListActive={field.value}
              onSelectPropertyItem={field.onChange}
              propertyId={propertyId}
            />
            {/* <FormMessage /> */}
          </FormItem>
        )}
      />
    );
  };

PropertyItemFormElements.FieldPropertyItemCheckbox =
  function FieldPropertyItemCheckbox(props: PropertyItemElementProps) {
    const { propertyId } = props;
    const { control, getFieldState } =
      useFormContext<PropertyItemFormDefaultValues>();

    if (!getFieldState("propertyItemList")) return null;
    const { propertySelectOptionList, isPending, isSuccess } =
      usePropertyItemListToSelectModel(propertyId);

    return (
      <FormField
        control={control}
        name="propertyItemList"
        render={({ field }) => (
          <FormItem>
            <FormLabel>PropertyItem</FormLabel>
            <PropertyItemCheckboxElement
              propertyItemListActive={field.value}
              onSelectPropertyItem={field.onChange}
              propertyId={propertyId}
            />
            {/* <FormMessage /> */}
          </FormItem>
        )}
        // render={({ field: { onChange, value } }) => (
        //   <FormItem>
        //     <div className="mb-4">
        //       <FormLabel className="text-base">Sidebar</FormLabel>
        //       <FormDescription>
        //         Select the items you want to display in the sidebar.
        //       </FormDescription>
        //     </div>
        //     {propertySelectOptionList.map((row) => (
        //       <FormItem
        //         key={row.value}
        //         className="flex flex-row items-start space-x-3 space-y-0"
        //       >
        //         {row.value}
        //         <FormControl>
        //           <Checkbox
        //             onCheckedChange={() => {
        //               console.log("output_log: ROW =>>>", row);
        //               console.log("output_log:  =>>>", value);
        //               onChange([...value, row.value]);
        //             }}
        //           />
        //         </FormControl>
        //         <FormLabel className="font-normal">{row.label}</FormLabel>
        //       </FormItem>
        //     ))}
        //   </FormItem>
        // )}
      />
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
