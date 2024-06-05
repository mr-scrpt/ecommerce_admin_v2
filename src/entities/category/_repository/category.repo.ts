import { DBClient, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import {
  CategoryBindProductListDTO,
  CategoryBindPropertyListDTO,
  CategoryCreateDTO,
  CategoryGetBySlugDTO,
  CategoryGetDTO,
  CategoryRemoveBySlugDTO,
  CategoryRemoveDTO,
  CategoryUpdateDTO,
} from "../_domain/category.dto";
import { CategoryEntity, CategoryRelationEntity } from "../_domain/types";

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
    const { data } = dto;

    return await db.category.create({
      data,
    });
  }

  async updateCategory(
    dto: CategoryUpdateDTO,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    const { selector, data } = dto;
    const { id } = selector;
    console.log("output_log: in repo =>>>", dto);

    return await db.category.update({
      where: { id },
      data,
    });
  }

  async removeCategory(
    dto: CategoryRemoveDTO,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    const {
      selector: { id },
    } = dto;

    return await db.category.delete({ where: { id } });
  }

  async removeCategoryBySlug(
    dto: CategoryRemoveBySlugDTO,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    const {
      selector: { slug },
    } = dto;

    return await db.category.delete({ where: { slug } });
  }

  async bindCategoryPropertyList(
    dto: CategoryBindPropertyListDTO,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    const { selector, data } = dto;
    const { id } = selector;
    const { propertyListId } = data;

    return await db.category.update({
      where: {
        id,
      },
      data: {
        propertyList: {
          set: propertyListId.map(({ propertyId }) => ({ id: propertyId })),
        },
      },
    });
  }

  async bindCategoryProductList(
    dto: CategoryBindProductListDTO,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    const { selector, data } = dto;
    const { id } = selector;
    const { productListId } = data;

    return await db.category.update({
      where: {
        id,
      },
      data: {
        productList: {
          connect: productListId.map(({ productId }) => ({ id: productId })),
        },
      },
    });
  }
}
