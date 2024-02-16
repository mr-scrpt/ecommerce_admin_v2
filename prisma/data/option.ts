import { OptionDataTypeEnum } from "../../src/entities/option";

export const optionListSeed = [
  {
    id: "option_585fsddfew7898dd",
    name: "Size",
    datatype: OptionDataTypeEnum.SELECT,
  },
  {
    id: "option_11fsddfew7898186",
    name: "Color",
    datatype: OptionDataTypeEnum.MULT,

    categoryList: { connect: [] },
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
