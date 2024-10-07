import { Button } from "@/shared/ui/button";
import { FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { MinusIcon, PlusIcon } from "lucide-react";
import { FC } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { PropertyItemFormDefaultValues } from "../../../../_domain/propertyItem/form.schema";
import { PropertyItemNameElement } from "./propertyItemNameElement";
import { PropertyItemValueElement } from "./propertyItemValueElement";

export const PropertyItemListElement: FC = () => {
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
              name={`propertyItemList.${idx}.propertyItemName`}
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
              name={`propertyItemList.${idx}.propertyItemValue`}
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
        onClick={() =>
          append({
            value: "",
            label: "",
            propertyItemValue: "",
            propertyItemName: "",
            propertyId: "",
          })
        }
      >
        <PlusIcon size="15" /> Add property line
      </Button>
    </div>
  );
};
