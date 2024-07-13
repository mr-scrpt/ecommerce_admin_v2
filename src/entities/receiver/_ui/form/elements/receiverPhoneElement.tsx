import { FormControl } from "@/shared/ui/form";
import { PhoneInput } from "@/shared/ui/phoneInput";
import { FC, HTMLAttributes } from "react";
import { Country } from "react-phone-number-input";

interface ReceiverPhoneElementProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  onChange: (value: string) => void;
  countryDefault?: string;
}

export const ReceiverPhoneElement: FC<ReceiverPhoneElementProps> = (props) => {
  const { onChange, countryDefault = "UA" } = props;

  return (
    <FormControl>
      <PhoneInput
        placeholder="Enter a phone number"
        defaultCountry={countryDefault as Country}
        initialValueFormat="national"
        onChange={onChange}
      ></PhoneInput>
    </FormControl>
  );
};
