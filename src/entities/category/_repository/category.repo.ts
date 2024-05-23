import { DBClient, Tx } from "@/shared/lib/db";
import { injectable } from "inversify";
import {
  CategoryAddProductList,
  CategoryAddPropertyList,
  CategoryEntity,
  CategoryId,
  CategoryRelationEntity,
  CategoryToCreate,
  CategoryToUpdate,
} from "../_domain/types";

@injectable()
export class CategoryRepository {
  constructor(readonly db: DBClient) {}

  async getCategory(
    categoryId: CategoryId,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    const res = db.category.findUniqueOrThrow({
      where: {
        id: categoryId,
      },
    });

    return res;
  }

  async getCategoryWithRelation(
    categoryId: CategoryId,
    db: Tx = this.db,
  ): Promise<CategoryRelationEntity> {
    const res = await db.category.findUniqueOrThrow({
      where: {
        id: categoryId,
      },
      include: {
        propertyList: true,
        productList: true,
      },
    });

    return res;
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

  async getCategoryBySlugWithRelation(
    slug: string,
    db: Tx = this.db,
  ): Promise<CategoryRelationEntity> {
    return await db.category.findUniqueOrThrow({
      where: {
        slug,
      },
      include: {
        propertyList: true,
        productList: true,
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
        propertyList: true,
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

  async addCategoryPropertyList(
    data: CategoryAddPropertyList,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    const { categoryId, propertyListId } = data;
    return await db.category.update({
      where: {
        id: categoryId,
      },
      data: {
        propertyList: {
          set: propertyListId,
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
    categoryData: Partial<CategoryToUpdate>,
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

  async removeCategoryBySlug(
    slug: string,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    return await db.category.delete({ where: { slug } });
  }
}
