import { PropertyDataTypeEnum } from "@/shared/type/propertyDataType.enum";
import { ProductFormSelect } from "./productFormSelect";
import { ProductFormCheckbox } from "./productFormCheckbox";
import { ProductFormMult } from "./productFormMult";
import { ProductFormRadio } from "./productFormRadio";
import { ProductPropertyToSelect } from "../../_domain/types";

const propertyTypeToComponentMap = {
  [PropertyDataTypeEnum.SELECT]: ProductFormSelect,
  [PropertyDataTypeEnum.CHECKBOX]: ProductFormCheckbox,
  [PropertyDataTypeEnum.MULT]: ProductFormMult,
  [PropertyDataTypeEnum.RADIO]: ProductFormRadio,
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
