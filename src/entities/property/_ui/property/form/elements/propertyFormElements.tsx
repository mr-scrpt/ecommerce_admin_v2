"use client";
import { DataTypeDefaultOption } from "@/entities/property/_vm/useSelectDataType";
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
import { Input } from "@/shared/ui/input";
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
  PropertyFormDefaultValues,
  propertyFormDefaultSchema,
} from "../../../../_domain/property/form.schema";
import { PropertyDataTypeSelectElement } from "./propertyDataTypeElement";
import { PropertyMultiSelectElement } from "./propertyMultiSelectElement";
import { PropertySelectElement } from "./propertySelectElement";

interface PropertyFormElementsProps<T extends PropertyFormDefaultValues>
  extends HTMLAttributes<HTMLFormElement> {
  handleSubmit?: (data: T) => void;
  defaultValues?: DefaultValues<T>;
  schema?: ZodTypeAny;
}

type PropertyFormElementsComponent = <
  T extends PropertyFormDefaultValues = PropertyFormDefaultValues,
>(
  props: PropertyFormElementsProps<T>,
) => React.ReactElement;

type PropertyFormFields = {
  FieldName: FC;
  FieldDataType: FC;
  FieldPropertySelect: FC;
  FieldPropertyMultiSelect: FC;

  SubmitButton: ButtonSubmitComponentType;
};

type PropertyFormElementsType = PropertyFormElementsComponent &
  PropertyFormFields;

const standartFieldsValues: PropertyFormDefaultValues = {
  name: "",
  datatype: [DataTypeDefaultOption],
  propertyList: [],
};

const getDefaultFormValues = <T extends PropertyFormDefaultValues>(
  defaultValues?: DefaultValues<T> | undefined,
): DefaultValues<T> => {
  return {
    ...standartFieldsValues,
    ...defaultValues,
  } as DefaultValues<T>;
};

export const PropertyFormElements: PropertyFormElementsType = <
  T extends PropertyFormDefaultValues,
>(
  props: PropertyFormElementsProps<T>,
) => {
  const { handleSubmit: onSubmit, schema, defaultValues, children } = props;

  const form = useForm<T>({
    resolver: zodResolver(schema ?? propertyFormDefaultSchema),
    defaultValues: { ...getDefaultFormValues<T>(defaultValues) },
  });

  useEffect(() => {
    form.reset(getDefaultFormValues<T>(defaultValues));
  }, [defaultValues, form]);

  const handleSubmit = form.handleSubmit(async (data: T) => {
    onSubmit?.(data);
  });

  console.log("output_log:  =>>> form values", form.getValues());
  console.log("output_log: form errors =>>>", form.formState.errors);
  console.log("output_log: form state =>>>", form.formState);

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

PropertyFormElements.FieldName = function FieldName() {
  const form = useFormContext<PropertyFormDefaultValues>();

  return (
    <div className="flex w-full flex-col gap-2">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Property name</FormLabel>
            <FormControl>
              <Input placeholder="Enter property name..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

PropertyFormElements.FieldDataType = function FieldDataType() {
  const { control } = useFormContext<PropertyFormDefaultValues>();
  return (
    <FormField
      control={control}
      name="datatype"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Data type</FormLabel>
          <PropertyDataTypeSelectElement
            datatypeActive={field.value[0]}
            onSelectDatatype={field.onChange}
          />
          <FormDescription>Select data type to this property</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

PropertyFormElements.FieldPropertySelect = function FieldList() {
  const { control, getFieldState } =
    useFormContext<PropertyFormDefaultValues>();

  if (!getFieldState("propertyList")) return null;

  return (
    <FormField
      control={control}
      name="propertyList"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Property list</FormLabel>
          <PropertySelectElement
            propertyListActive={field.value![0]}
            onSelectProperty={field.onChange}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

PropertyFormElements.FieldPropertyMultiSelect = function FieldList() {
  const { control } = useFormContext<PropertyFormDefaultValues>();

  return (
    <FormField
      control={control}
      name="propertyList"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Property multi select</FormLabel>
          <PropertyMultiSelectElement
            propertyListActive={field.value}
            onSelectProperty={field.onChange}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// PropertyFormElements.FieldSelectPropertyItem = function FieldPropertyItemList({
//   isPending,
// }: {
//   isPending: boolean;
// }) {
//   const form = useFormContext<PropertyFormValues>();
//
//   const { fields, append, remove } = useFieldArray({
//     name: "propertyItemList",
//     control: form.control,
//   });
//
//   return (
//     <div className="flex w-full flex-col gap-4">
//       {fields.map((item, idx) => {
//         return (
//           <div key={item.id} className="flex w-full gap-4">
//             <FormField
//               control={form.control}
//               name={`propertyItemList.${idx}.name`}
//               render={({ field }) => (
//                 <FormItem className="flex-grow">
//                   <FormLabel>Option name</FormLabel>
//                   <FormControl>
//                     <Input
//                       disabled={isPending}
//                       placeholder="Enter option name..."
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             ></FormField>
//             <FormField
//               control={form.control}
//               name={`propertyItemList.${idx}.value`}
//               render={({ field }) => (
//                 <FormItem className="flex-grow">
//                   <FormLabel>Option value</FormLabel>
//                   <FormControl>
//                     <Input
//                       disabled={isPending}
//                       placeholder="Enter optin value..."
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             ></FormField>
//             {idx > 0 ? (
//               <Button
//                 type="button"
//                 className="mb-0 mt-auto"
//                 variant="destructive"
//                 onClick={() => remove(idx)}
//               >
//                 <MinusIcon size="10" />
//               </Button>
//             ) : (
//               <Button
//                 type="button"
//                 disabled
//                 className="mb-0 mt-auto"
//                 variant="destructive"
//               >
//                 <MinusIcon size="10" />
//               </Button>
//             )}
//           </div>
//         );
//       })}
//
//       <Button type="button" onClick={() => append({ name: "", value: "" })}>
//         <PlusIcon size="15" /> Add property line
//       </Button>
//     </div>
//   );
// };

PropertyFormElements.SubmitButton = function SubmitButton({
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
