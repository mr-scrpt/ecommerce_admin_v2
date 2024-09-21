import { PROPERTY_DATATYPE } from "@/kernel/domain/property/property.type";
import { FC } from "react";
import { ProductPropertyCheckbox } from "../_ui/form/sections/productPropertyCheckbox";
import { ProductPropertySelect } from "../_ui/form/sections/productPropertySelect";
import { ProductPropertyMultiSelect } from "../_ui/form/sections/productPropertyMultiSelect";
import { ProductPropertyRadio } from "../_ui/form/sections/productPropertyRadio";

interface BaseComponentProps {
  propertyId: string;
  title: string;
}

type ComponentType = FC<BaseComponentProps>;

interface InjectionComponentProps {
  Checkbox: ComponentType;
  Select: ComponentType;
  Mult: ComponentType;
  Radio: ComponentType;
}

type SelectProductPropertyDatatype = {
  [K in keyof typeof PROPERTY_DATATYPE]: {
    value: (typeof PROPERTY_DATATYPE)[K];
    type: (typeof PROPERTY_DATATYPE)[K];
    formElement: (props: BaseComponentProps) => React.ReactElement;
  };
};
export const ProductPropertyDatatypeFieldList = (
  props: InjectionComponentProps,
): SelectProductPropertyDatatype => ({
  [PROPERTY_DATATYPE.CHECKBOX]: {
    value: PROPERTY_DATATYPE.CHECKBOX,
    type: PROPERTY_DATATYPE.CHECKBOX,
    formElement: (formProps) => (
      <ProductPropertyCheckbox
        {...formProps}
        key={PROPERTY_DATATYPE.CHECKBOX}
        Component={props.Checkbox}
      />
    ),
  },
  [PROPERTY_DATATYPE.SELECT]: {
    value: PROPERTY_DATATYPE.SELECT,
    type: PROPERTY_DATATYPE.SELECT,
    formElement: (formProps) => (
      <ProductPropertySelect
        {...formProps}
        key={PROPERTY_DATATYPE.SELECT}
        Component={props.Select}
      />
    ),
  },
  [PROPERTY_DATATYPE.MULT]: {
    value: PROPERTY_DATATYPE.MULT,
    type: PROPERTY_DATATYPE.MULT,
    formElement: (formProps) => (
      <ProductPropertyMultiSelect
        {...formProps}
        key={PROPERTY_DATATYPE.MULT}
        Component={props.Mult}
      />
    ),
  },
  [PROPERTY_DATATYPE.RADIO]: {
    value: PROPERTY_DATATYPE.RADIO,
    type: PROPERTY_DATATYPE.RADIO,
    formElement: (formProps) => (
      <ProductPropertyRadio
        {...formProps}
        key={PROPERTY_DATATYPE.RADIO}
        Component={props.Radio}
      />
    ),
  },
});
