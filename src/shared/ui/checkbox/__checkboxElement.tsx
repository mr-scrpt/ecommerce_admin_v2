import { PropertyItemFormDefaultValues } from "@/entities/property/_domain/propertyItem/form.schema";
import { DefaultSelectOption } from "@/shared/type/select";
import { HTMLAttributes } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { Checkbox } from "../checkbox";
import { FormControl, FormField, FormItem, FormLabel } from "../form";

// interface CheckboxListElementProps<
//   T extends DefaultSelectOption = DefaultSelectOption,
// > extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
//   onSelect: (items: Array<T>) => void;
//   optionList: Array<T>;
//   optionActive?: T;
//   placeholder?: string;
//   control: Control<PropertyItemFormDefaultValues>;
//   filedName: keyof PropertyItemFormDefaultValues;
// }

interface CheckboxListElementProps<
  T extends DefaultSelectOption = DefaultSelectOption,
  TFieldValues extends Array<DefaultSelectOption> = Array<DefaultSelectOption>,
> extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  onSelect: (items: Array<T>) => void;
  optionList: Array<T>;
  optionActive?: T;
  placeholder?: string;
  control: Control<TFieldValues>;
  fieldName: FieldPath<TFieldValues>;
}

export const CheckboxListElement = <
  T extends DefaultSelectOption = DefaultSelectOption,
  TFieldValues extends Array<DefaultSelectOption> = Array<DefaultSelectOption>,
>(
  props: CheckboxListElementProps<T, TFieldValues>,
) => {
  const { optionList, onSelect, optionActive, control, fieldName } = props;

  return (
    <div>
      {optionList.map((item) => (
        <FormField
          key={item.value}
          control={control}
          name={fieldName}
          render={({ field }) => {
            console.log("output_log: field.value =>>>", field.);
            return (
              <FormItem
                key={item.value}
                className="flex flex-row items-start space-x-3 space-y-0"
              >
                <FormControl>
                  {/* <Checkbox checked={field.value?.includes(item.value)} /> */}
                  <Checkbox
                    // checked={
                    //   Array.isArray(field.value) &&
                    //   field.value.includes(item.value)
                    // }
                    // checked={field.value?.includes(item.value)}
                    checked={field.value?.includes(item.value)}
                    onCheckedChange={(checked) => {
                      const updatedValue = checked
                        ? [...(field.value || []), item]
                        : (field.value || []).filter(
                            (value: T) => value.value !== item.value,
                          );
                      field.onChange(updatedValue);
                      onSelect(updatedValue);
                    }}
                  />
                </FormControl>
                <FormLabel className="font-normal">{item.label}</FormLabel>
              </FormItem>
            );
          }}
        />
      ))}
    </div>
  );
};
