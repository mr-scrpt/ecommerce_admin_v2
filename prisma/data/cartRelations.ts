export const cartRelationsSeed = [
  {
    id: "cartId_oehsjkjiew78hes_Cart_AdminUser",
    productList: {
      connect: [
        { id: "prod_585fsddfew7898few" },
        { id: "prod_3375fsd7898dew" },
      ],
    },
  },
  {
    id: "cartId_11ojkjiew7898hoy_Cart_User",
    productList: {
      connect: [{ id: "prod_3375fsd7898dew" }],
    },
  },
  {
    id: "cartId_789jkjiewdddhd55Cart_User2",
    productList: {
      connect: [{ id: "prod_ew975fee9885" }],
    },
  },
];
