import { DefaultSelectOption } from "@/shared/type/select";
import { HTMLAttributes } from "react";
import { Checkbox } from "../checkbox";
import { FormControl, FormItem, FormLabel } from "../form";

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
> extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  onSelect: (items: Array<T>) => void;
  optionList: Array<T>;
  optionActiveList?: Array<T>;
  placeholder?: string;
}

export const CheckboxListElement = <
  T extends DefaultSelectOption = DefaultSelectOption,
>(
  props: CheckboxListElementProps<T>,
) => {
  const { optionList, onSelect, optionActiveList } = props;

  return (
    <div>
      {optionList.map((item) => (
        <FormItem
          key={item.value}
          className="flex flex-row items-start space-x-3 space-y-0"
        >
          <FormControl>
            <Checkbox
              checked={optionActiveList?.some(
                (row) => row.value === item.value,
              )}
              onCheckedChange={() => {
                if (optionActiveList?.some((row) => row.value === item.value)) {
                  onSelect(
                    optionActiveList?.filter((row) => row.value !== item.value),
                  );
                } else {
                  onSelect([
                    ...(optionActiveList?.length ? optionActiveList : []),
                    item,
                  ]);
                }
              }}
            />
          </FormControl>
          <FormLabel className="font-normal">{item.label}</FormLabel>
        </FormItem>
      ))}
    </div>
  );
};
