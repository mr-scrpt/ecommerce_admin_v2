import { ReturnedMonadArray, ReturnedMonadFlat } from "@/kernel/lib/monad/type";

// NOTE: Base
export type CategoryBase = {
  name: string;
  slug: string;
  board: Array<string>;
};

// NOTE: Entity
export type CategoryEntity = CategoryBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

// NOTE: Projetions
export type Category = CategoryBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

// // NOTE: Return
// export type CategoryEntityReturnFlat = ReturnedMonadFlat<CategoryEntity>;
// export type CategoryEntityListReturnFlat = ReturnedMonadFlat<
//   Array<CategoryEntity>
// >;
//
// export type CategoryReturnArray = ReturnedMonadArray<Category>;
// export type CategoryReturnFlat = ReturnedMonadFlat<Category>;
// export type CategoryListReturnArray = ReturnedMonadArray<Array<Category>>;
// export type CategoryListReturnFlat = ReturnedMonadFlat<Array<Category>>;
