import { DefaultSelectOption } from "@/shared/type/select";
import { FC, HTMLAttributes } from "react";
import { RadioGroup, RadioGroupItem } from "../radio-group";
import { FormControl, FormItem, FormLabel } from "../form";

interface RadioElementProps<T extends DefaultSelectOption = DefaultSelectOption>
  extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  onSelect: (items: Array<T>) => void;
  optionList: Array<T>;
  optionActive?: T | null;
  placeholder?: string;
}

export const RadioElement = <T extends DefaultSelectOption>(
  props: RadioElementProps<T>,
) => {
  const {
    optionActive,
    optionList,
    placeholder = "Select...",
    onSelect,
  } = props;

  const defaultValue = optionActive?.value || "";

  return (
    <RadioGroup
      defaultValue={defaultValue}
      value={defaultValue}
      onValueChange={(value) => {
        const radioOption = optionList.find((item) => item.value === value);

        if (!radioOption) return;

        onSelect([radioOption]);
      }}
      disabled={!optionList.length}
    >
      {optionList.map((item) => {
        return (
          <FormItem
            className="flex items-center space-x-3 space-y-0"
            key={item.value}
          >
            <FormControl>
              <RadioGroupItem value={item.value} />
            </FormControl>
            <FormLabel className="font-normal">{item.label}</FormLabel>
          </FormItem>
        );
      })}
    </RadioGroup>
  );
};
