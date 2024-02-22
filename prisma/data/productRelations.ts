export const productRelationsSeed = [
  {
    id: "prod_585fsddfew7898few",
    categoryList: { connect: [{ id: "cat_585fsddfew7898few" }] },
  },
  {
    id: "prod_3375fsd7898dew",
    categoryList: {
      connect: [{ id: "cat_ew975fee9885" }],
    },
  },
  {
    id: "prod_ew975fee9885",
    categoryList: {
      connect: [{ id: "cat_585fsddfew7898few" }, { id: "cat_ew975fee9885" }],
    },
  },
];
