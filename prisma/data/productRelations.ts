export const productRelationsSeed = [
  {
    id: "prod_585fsddfew7898few",
    categoryList: {
      connect: [{ id: "cat_585fsddfew7898few" }, { id: "cat_ew975fee9885" }],
    },
    propertyItemListSelected: {
      connect: [
        { id: "propertyItem_8fsddfew7898d857" },
        { id: "propertyItem_M68ddtwaew65687M" },
        { id: "propertyItem_esgeda987waew65OLD" },
        { id: "propertyItem_77da558waew77YES" },

        // { id: "propertyItem_L58ddtwaew65622L" },
      ],
    },
  },
  {
    id: "prod_3375fsd7898dew",
    categoryList: {
      connect: [{ id: "cat_ew975fee9885" }],
    },
    propertyItemListSelected: {
      connect: [
        { id: "propertyItem_d555fsddfew78981fe" },
        { id: "propertyItem_8fsddfew7898d857" },
      ],
    },
  },
  {
    id: "prod_ew975fee9885",
    categoryList: {
      connect: [{ id: "cat_585fsddfew7898few" }, { id: "cat_ew975fee9885" }],
    },
    propertyItemListSelected: {
      connect: [{ id: "propertyItem_d555fsddfew78981fe" }],
    },
  },
];
