export const productRelationsSeed = [
  {
    id: "prod_585fsddfew7898few",
    categoryList: { connect: [{ id: "cat_585fsddfew7898few" }] },
    optionItemListSelected: {
      connect: [{ id: "optionItem_8fsddfew7898d857" }],
    },
  },
  {
    id: "prod_3375fsd7898dew",
    categoryList: {
      connect: [{ id: "cat_ew975fee9885" }],
    },
    optionItemListSelected: {
      connect: [
        { id: "optionItem_d555fsddfew78981fe" },
        { id: "optionItem_8fsddfew7898d857" },
      ],
    },
  },
  {
    id: "prod_ew975fee9885",
    categoryList: {
      connect: [{ id: "cat_585fsddfew7898few" }, { id: "cat_ew975fee9885" }],
    },
    optionItemListSelected: {
      connect: [{ id: "optionItem_d555fsddfew78981fe" }],
    },
  },
];
