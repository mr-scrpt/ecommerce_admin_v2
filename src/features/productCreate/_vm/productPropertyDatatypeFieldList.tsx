import { PROPERTY_DATATYPE } from "@/kernel/domain/property/property.type";
import { ProductPropertyCheckbox } from "../_ui/form/elements/sections/productPropertyCheckbox";
import { ProductPropertySelect } from "../_ui/form/elements/sections/productPropertySelect";
import { ProductPropertyMultiSelect } from "../_ui/form/elements/sections/productPropertyMultiSelect";
import { ProductPropertyRadio } from "../_ui/form/elements/sections/productPropertyRadio";
// import { DeliveryCommonSectionProps } from "../_domain/ui.type";

type ProductPropertyDatatypeKeys = keyof typeof PROPERTY_DATATYPE;

type SelectProductPropertyDatatype = {
  [key in ProductPropertyDatatypeKeys]: {
    value: string;
    type: PROPERTY_DATATYPE;
    // formElement: Array<(props: DeliveryCommonSectionProps) => JSX.Element>;
    // TODO: type any remove
    formElement: (props: any) => JSX.Element;
  };
};

export const ProductPropertyDatatypeFieldList: SelectProductPropertyDatatype = {
  [PROPERTY_DATATYPE.CHECKBOX]: {
    value: PROPERTY_DATATYPE.CHECKBOX,
    type: PROPERTY_DATATYPE.CHECKBOX,
    formElement: (props) => {
      return (
        <ProductPropertyCheckbox {...props} key={PROPERTY_DATATYPE.CHECKBOX} />
      );
    },
  },
  [PROPERTY_DATATYPE.SELECT]: {
    value: PROPERTY_DATATYPE.SELECT,
    type: PROPERTY_DATATYPE.SELECT,
    formElement: (props) => {
      return (
        <ProductPropertySelect {...props} key={PROPERTY_DATATYPE.SELECT} />
      );
    },
  },
  [PROPERTY_DATATYPE.MULT]: {
    value: PROPERTY_DATATYPE.MULT,
    type: PROPERTY_DATATYPE.MULT,
    formElement: (props) => {
      return (
        <ProductPropertyMultiSelect {...props} key={PROPERTY_DATATYPE.MULT} />
      );
    },
  },
  [PROPERTY_DATATYPE.RADIO]: {
    value: PROPERTY_DATATYPE.RADIO,
    type: PROPERTY_DATATYPE.RADIO,
    formElement: (props) => {
      return <ProductPropertyRadio {...props} key={PROPERTY_DATATYPE.RADIO} />;
    },
  },
};

// export type PickupType =
//   (typeof ProductPropertyDatatypeFieldList)[typeof DELIVERY_TYPE.PICKUP];
// export type PostType =
//   (typeof ProductPropertyDatatypeFieldList)[typeof DELIVERY_TYPE.POST];
// export type CourierType =
//   (typeof ProductPropertyDatatypeFieldList)[typeof DELIVERY_TYPE.COURIER];
