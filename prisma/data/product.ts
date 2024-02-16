export const productListSeed = [
  {
    id: "prod_585fsddfew789879",
    name: "First Product",
    description: "Metadata to first product",
    about: "About first product text",
    slug: "first-product",
    img: [
      "https://images.examples.com/wp-content/uploads/2018/04/urban-billboard.jpg",
      "https://images.examples.com/wp-content/uploads/2018/04/Station-Billboard-Design-Example.jpg?width=600",
    ],
    categoryList: { connect: [{ id: "cat_585fsddfew789879" }] },
  },
  {
    id: "prod_df58775fsd789879",
    name: "Second product",
    description: "Metadata to second product",
    about: "About second product text",
    slug: "second-product",
    img: [
      "https://images.examples.com/wp-content/uploads/2018/04/School-Billboard-Design-Example.jpg?width=600",
      "https://images.examples.com/wp-content/uploads/2018/04/Metal-Billboard-Design-Example.jpg?width=600",
    ],
    categoryList: { connect: [] },
  },
  {
    id: "prod_ew975fee9885",
    name: "Third product",
    description: "Metadata to third product",
    about: "About third produtc text",
    slug: "third-product",
    img: [
      "https://images.examples.com/wp-content/uploads/2018/04/Outdoor-Advertising-Billboard-Design-Example.jpg?width=600",
      "https://images.examples.com/wp-content/uploads/2018/04/Metal-Billboard-Design-Example.jpg?width=600",
    ],
    categoryList: {
      connect: [{ id: "cat_df58775fsd789879" }, { id: "cat_ew975fee9885" }],
    },
  },
];