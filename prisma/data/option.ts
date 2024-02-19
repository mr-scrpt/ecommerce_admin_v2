import { OptionDataTypeEnum } from "../../src/shared/type/optionDataType.enum";

export const optionListSeed = [
  {
    id: "option_585fsddfew7898dd",
    name: "Size",
    datatype: OptionDataTypeEnum.SELECT,
    categoryList: { connect: [{ id: "cat_df58775fsd789879" }] },
  },
  {
    id: "option_11fsddfew7898186",
    name: "Color",
    datatype: OptionDataTypeEnum.MULT,

    categoryList: { connect: [{ id: "cat_ew975fee9885" }] },
  },
  {
    id: "option_195fsd55846fddew",
    name: "Type",
    datatype: OptionDataTypeEnum.CHECKBOX,

    categoryList: {
      connect: [{ id: "cat_df58775fsd789879" }, { id: "cat_ew975fee9885" }],
    },
  },
];
