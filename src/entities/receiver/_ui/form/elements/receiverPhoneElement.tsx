import { FormControl } from "@/shared/ui/form";
import { PhoneInput } from "@/shared/ui/phoneInput";
import { FC, HTMLAttributes } from "react";
import { Country } from "react-phone-number-input";

interface ReceiverPhoneElementProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  countryDefault?: string;
}

export const ReceiverPhoneElement: FC<ReceiverPhoneElementProps> = (props) => {
  const { onChange, value, countryDefault = "UA" } = props;

  return (
    <FormControl>
      <PhoneInput
        placeholder="Enter a phone number"
        defaultCountry={countryDefault as Country}
        initialValueFormat="national"
        onChange={onChange}
        value={value}
      ></PhoneInput>
    </FormControl>
  );
};
