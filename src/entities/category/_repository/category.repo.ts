import { DBClient, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { CategoryEntity, CategoryRelationEntity } from "../_domain/types";
import {
  CategoryAddProductListDTO,
  CategoryAddPropertyListDTO,
  CategoryCreateDTO,
  CategoryUpdateDTO,
} from "../_domain/dto";

@injectable()
export class CategoryRepository {
  constructor(readonly db: DBClient) {}

  async getCategory(
    categoryId: string,
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
    categoryId: string,
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
    categoryId: string,
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
    category: CategoryCreateDTO,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    return await db.category.create({
      data: category,
    });
  }

  async addCategoryPropertyList(
    data: CategoryAddPropertyListDTO,
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
    data: CategoryAddProductListDTO,
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
    targetId: string,
    categoryData: Partial<CategoryUpdateDTO>,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    return await db.category.update({
      where: { id: targetId },
      data: categoryData,
    });
  }

  async removeCategoryById(
    categoryId: string,
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
