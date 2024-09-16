import { ProductFormSelect } from "./productFormSelect";
import { ProductFormCheckbox } from "./productFormCheckbox";
import { ProductFormMult } from "./productFormMult";
import { ProductFormRadio } from "./productFormRadio";
import { ProductPropertyToSelect } from "../../_domain/product.types";
import { PROPERTY_DATATYPE } from "@prisma/client";

const propertyTypeToComponentMap = {
  [PROPERTY_DATATYPE.SELECT]: ProductFormSelect,
  [PROPERTY_DATATYPE.CHECKBOX]: ProductFormCheckbox,
  [PROPERTY_DATATYPE.MULT]: ProductFormMult,
  [PROPERTY_DATATYPE.RADIO]: ProductFormRadio,
};

export const renderFormField = ({
  option,
  control,
  setValue,
}: {
  option: ProductPropertyToSelect;
  control: any;
  setValue: any;
}) => {
  const Component = propertyTypeToComponentMap[option.datatype];
  // console.log("output_log: option in fn =>>>", option);

  if (Component) {
    return (
      <Component
        key={option.name}
        name={option.name}
        propertyList={option.propertyList}
        control={control}
        setValue={setValue} // Этот пропс нужен только для ProductMult, удалите его, если он не нужен для других компонентов
        className="w-full"
      />
    );
  }

  return null;
};
