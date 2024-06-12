import { DBClient, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import {
  CategoryBindToProductListDTO,
  CategoryBindToPropertyListDTO,
  CategoryCreateDTO,
  CategoryGetBySlugDTO,
  CategoryGetDTO,
  CategoryRemoveBySlugDTO,
  CategoryRemoveDTO,
  CategoryUpdateDTO,
} from "../_domain/category.dto";
import { CategoryEntity, CategoryRelationEntity } from "../_domain/types";
import { ICategoryRepository } from "../_domain/repository.type";

@injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(private readonly db: DBClient) {}

  async get(dto: CategoryGetDTO, db: Tx = this.db): Promise<CategoryEntity> {
    const { id } = dto;

    const res = db.category.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return res;
  }

  async getWithRelation(
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

  async getBySlug(
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

  async getBySlugRelation(
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

  async getList(db: Tx = this.db): Promise<CategoryEntity[]> {
    return db.category.findMany();
  }

  async create(
    dto: CategoryCreateDTO,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    const { data } = dto;

    return await db.category.create({
      data,
    });
  }

  async update(
    dto: CategoryUpdateDTO,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    const { selector, data } = dto;
    const { id } = selector;

    return await db.category.update({
      where: { id },
      data,
    });
  }

  async remove(
    dto: CategoryRemoveDTO,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    const { selector } = dto;

    return await db.category.delete({ where: { id: selector.id } });
  }

  async removeBySlug(
    dto: CategoryRemoveBySlugDTO,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    const { selector } = dto;

    return await db.category.delete({ where: { slug: selector.slug } });
  }

  async bindToPropertyList(
    dto: CategoryBindToPropertyListDTO,
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

  async bindToProductList(
    dto: CategoryBindToProductListDTO,
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
