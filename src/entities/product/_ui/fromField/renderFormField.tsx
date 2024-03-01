import { PropertyDataTypeEnum } from "@/shared/type/propertyDataType.enum";
import { ProductSelect } from "./productSelect";
import { ProductCheckbox } from "./productCheckbox";
import { ProductMult } from "./productMult";
import { ProductRadio } from "./productRadio";
import { ProductPropertyToSelect } from "../../_domain/types";

const propertyTypeToComponentMap = {
  [PropertyDataTypeEnum.SELECT]: ProductSelect,
  [PropertyDataTypeEnum.CHECKBOX]: ProductCheckbox,
  [PropertyDataTypeEnum.MULT]: ProductMult,
  [PropertyDataTypeEnum.RADIO]: ProductRadio,
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

  if (Component) {
    return (
      <Component
        key={option.name}
        name={option.name}
        propertyList={option.propertyList}
        control={control}
        setValue={setValue} // Этот пропс нужен только для ProductMult, удалите его, если он не нужен для других компонентов
      />
    );
  }

  return null;
};
