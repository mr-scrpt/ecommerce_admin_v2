import { PROPERTY_DATATYPE } from "@prisma/client";

export const propertyListSeed = [
  {
    id: "property_id_1",
    name: "Size",
    datatype: PROPERTY_DATATYPE.SELECT,
    // isFilter: true,
  },
  {
    id: "property_id_2",
    name: "Color",
    datatype: PROPERTY_DATATYPE.MULT,
    // isFilter: true,
  },
  {
    id: "property_id_3",
    name: "Type",
    datatype: PROPERTY_DATATYPE.CHECKBOX,
    // isFilter: false,
  },
  {
    id: "property_id_4",
    name: "New",
    datatype: PROPERTY_DATATYPE.RADIO,
    // isFilter: true,
  },
];
