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
import { PropertyRelation } from "../_domain/property/types";
import { PropertyDataTypeEnum } from "@/kernel/domain/property.type";
import {
  PropertyFormValues,
  propertyFormSchema,
} from "../_domain/property/form.schema";
import { selectDataType } from "../_vm/selectDataType";

interface PropertyFormProps
  extends Omit<HTMLAttributes<HTMLFormElement>, "property"> {
  property?: PropertyRelation;
  handleSubmit?: (data: PropertyFormValues) => void;
  isPending: boolean;
  submitText?: string;
}

interface SubmitButtonProps {
  isPending: boolean;
  submitText: string;
}

interface FieldProperyItemProps {
  isPending: boolean;
}

type PropertyFormType = FC<PropertyFormProps> & {
  SubmitButton: FC<SubmitButtonProps>;
  FieldProperty: FC<{}>;
  FieldPropertysItem: FC<FieldProperyItemProps>;
};

const getDefaultValues = (property?: PropertyRelation) => ({
  name: property?.name ?? "",
  datatype: property?.datatype ?? PropertyDataTypeEnum.SELECT,
  propertyItemList: property?.propertyItemList ?? [{ name: "", value: "" }],
});

export const PropertyFormElements: PropertyFormType = (props) => {
  const {
    property,
    handleSubmit: onSubmit,
    submitText,
    isPending,
    children,
    className,
  } = props;

  const isPendingAppearance = useAppearanceDelay(isPending);

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      ...getDefaultValues(property),
    },
  });

  useEffect(() => {
    form.reset({
      ...getDefaultValues(property),
    });
  }, [property, form, isPendingAppearance, submitText]);

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

PropertyFormElements.FieldProperty = function FieldProperty() {
  const form = useFormContext<PropertyFormValues>();

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
                  <SelectItem key={item.type} value={item.type}>
                    {item.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>Select data type to this property</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

PropertyFormElements.FieldPropertysItem = function FieldPropertysItem({
  isPending,
}: {
  isPending: boolean;
}) {
  const form = useFormContext<PropertyFormValues>();

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
              name={`propertyItemList.${idx}.name`}
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel>Option name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
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
              name={`propertyItemList.${idx}.value`}
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel>Option value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="Enter optin value..."
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
        <PlusIcon size="15" /> Add property line
      </Button>
    </div>
  );
};
