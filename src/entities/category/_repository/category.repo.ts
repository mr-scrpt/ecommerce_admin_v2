import { DbClient, Tx, dbClient } from "@/shared/lib/db";
import {
  Category,
  CategoryAddOptionList,
  CategoryAddProductList,
  CategoryEntity,
  CategoryId,
  CategoryRelationEntity,
  CategoryToCreate,
} from "../_domain/types";

export class CategoryRepository {
  constructor(readonly db: DbClient) {}

  async getCategory(
    categoryId: CategoryId,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    return db.category.findUniqueOrThrow({
      where: {
        id: categoryId,
      },
    });
  }

  async getCategoryWithRelation(
    categoryId: CategoryId,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    return db.category.findUniqueOrThrow({
      where: {
        id: categoryId,
      },
      include: {
        optionList: true,
        productList: true,
      },
    });
  }

  async getCategoryBySlug(
    slug: string,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    return db.category.findUniqueOrThrow({
      where: {
        slug,
      },
    });
  }

  async getCategoryRelation(
    categoryId: CategoryId,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    return await db.category.findUniqueOrThrow({
      where: {
        id: categoryId,
      },
      include: {
        optionList: true,
        productList: true,
      },
    });
  }

  async getCategoryList(db: Tx = this.db): Promise<CategoryEntity[]> {
    return db.category.findMany();
  }

  async createCategory(
    category: CategoryToCreate,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    return await db.category.create({
      data: category,
    });
  }

  async addCategoryOptionList(
    data: CategoryAddOptionList,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    const { categoryId, optionListId } = data;
    return await db.category.update({
      where: {
        id: categoryId,
      },
      data: {
        optionList: {
          connect: optionListId,
        },
      },
    });
  }

  async addCategoryProductList(
    data: CategoryAddProductList,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    const { categoryId, productListId } = data;
    return await db.category.update({
      where: {
        id: categoryId,
      },
      data: {
        productList: {
          connect: productListId,
        },
      },
    });
  }

  async updateCategory(
    targetId: CategoryId,
    categoryData: Partial<Category>,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    return await db.category.update({
      where: { id: targetId },
      data: categoryData,
    });
  }

  async removeCategoryById(
    categoryId: CategoryId,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    return await db.category.delete({ where: { id: categoryId } });
  }
}

export const categoryRepository = new CategoryRepository(dbClient);
