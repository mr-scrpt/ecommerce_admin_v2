import { DBClient, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { CategoryEntity, CategoryRelationEntity } from "../_domain/types";
import {
  CategoryBindProductListDTO,
  CategoryBindPropertyListDTO,
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
    const { id } = dto;
    const res = db.category.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return res;
  }

  async getCategoryRelation(
    dto: CategoryGetDTO,
    db: Tx = this.db,
  ): Promise<CategoryRelationEntity> {
    const { id } = dto;
    return await db.category.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        propertyList: true,
        productList: true,
      },
    });
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

  async getCategoryBySlugRelation(
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

  async updateCategory(
    categoryData: Partial<CategoryUpdateDTO>,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    const { id, ...data } = categoryData;
    return await db.category.update({
      where: { id },
      data,
    });
  }

  async removeCategory(
    dto: CategoryRemoveDTO,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    const { id: categoryId } = dto;
    return await db.category.delete({ where: { id: categoryId } });
  }

  async removeCategoryBySlug(
    dto: CategoryRemoveBySlugDTO,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    const { slug } = dto;
    return await db.category.delete({ where: { slug } });
  }

  async bindCategoryPropertyList(
    dto: CategoryBindPropertyListDTO,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    const { id: categoryId, propertyListId } = dto;
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

  async bindCategoryProductList(
    dto: CategoryBindProductListDTO,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    const { id: categoryId, productListId } = dto;
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
}
