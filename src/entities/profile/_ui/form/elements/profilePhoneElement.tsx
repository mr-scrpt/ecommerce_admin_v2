import { FormControl } from "@/shared/ui/form";
import { PhoneInput } from "@/shared/ui/phoneInput";
import { FC, HTMLAttributes } from "react";
import { Country } from "react-phone-number-input";

interface ProfilePhoneElementProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  countryDefault?: Country;
}
export const ProfilePhoneElement: FC<ProfilePhoneElementProps> = (props) => {
  const { value, onChange, countryDefault = "UA" } = props;
  return (
    <FormControl className="w-full">
      <PhoneInput
        value={value}
        placeholder="Enter a phone number"
        defaultCountry={countryDefault as Country}
        initialValueFormat="national"
        onChange={onChange}
      />
    </FormControl>
  );
};
