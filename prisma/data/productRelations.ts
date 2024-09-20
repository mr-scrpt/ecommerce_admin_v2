export const productRelationsSeed = [
  {
    id: "prod_1",
    categoryList: {
      connect: [{ id: "cat_585fsddfew7898few" }, { id: "cat_ew975fee9885" }],
    },
    propertyItemList: {
      connect: [
        { id: "propertyItem_8fsddfew7898d857Red" },
        { id: "propertyItem_M68ddtwaew65687M" },
        { id: "propertyItem_esgeda987waew65OLD" },
        { id: "propertyItem_77da558waew77YES" },

        // { id: "propertyItem_L58ddtwaew65622L" },
      ],
    },
  },
  {
    id: "prod_2",
    categoryList: {
      connect: [{ id: "cat_ew975fee9885" }],
    },
    propertyItemList: {
      connect: [
        { id: "propertyItem_d555fsddfew78981feBlue" },
        { id: "propertyItem_8fsddfew7898d857Red" },
      ],
    },
  },
  {
    id: "prod_3",
    categoryList: {
      connect: [{ id: "cat_585fsddfew7898few" }, { id: "cat_ew975fee9885" }],
    },
    propertyItemList: {
      connect: [{ id: "propertyItem_d555fsddfew78981feBlue" }],
    },
  },
];
