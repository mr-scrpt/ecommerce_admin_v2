import { DBClient, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { CategoryEntity, CategoryRelationEntity } from "../_domain/types";
import {
  CategoryAddProductListDTO,
  CategoryAddPropertyListDTO,
  CategoryCreateDTO,
  CategoryRemoveBySlugDTO,
  CategoryRemoveDTO,
  CategoryUpdateDTO,
  CategoryGetDTO,
  CategoryGetBySlugDTO,
} from "../_domain/category.dto";

@injectable()
export class CategoryRepository {
  constructor(readonly db: DBClient) {}

  async getCategory(
    dto: CategoryGetDTO,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    const { categoryId } = dto;
    const res = db.category.findUniqueOrThrow({
      where: {
        id: categoryId,
      },
    });

    return res;
  }

  async getCategoryWithRelation(
    dto: CategoryGetDTO,
    db: Tx = this.db,
  ): Promise<CategoryRelationEntity> {
    const { categoryId } = dto;
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
    dto: CategoryGetBySlugDTO,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    const { slug } = dto;
    return db.category.findUniqueOrThrow({
      where: {
        slug,
      },
    });
  }

  async getCategoryBySlugWithRelation(
    dto: CategoryGetBySlugDTO,
    db: Tx = this.db,
  ): Promise<CategoryRelationEntity> {
    const { slug } = dto;
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
    dto: CategoryCreateDTO,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    return await db.category.create({
      data: dto,
    });
  }

  async addCategoryPropertyList(
    dto: CategoryAddPropertyListDTO,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    const { categoryId, propertyListId } = dto;
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
    dto: CategoryAddProductListDTO,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    const { categoryId, productListId } = dto;
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
    categoryData: Partial<CategoryUpdateDTO>,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    const { categoryId, ...data } = categoryData;
    return await db.category.update({
      where: { id: categoryId },
      data,
    });
  }

  async removeCategory(
    dto: CategoryRemoveDTO,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    const { categoryId } = dto;
    return await db.category.delete({ where: { id: categoryId } });
  }

  async removeCategoryBySlug(
    dto: CategoryRemoveBySlugDTO,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    const { slug } = dto;
    return await db.category.delete({ where: { slug } });
  }
}
