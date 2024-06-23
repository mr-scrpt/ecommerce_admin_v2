import { Tx } from "@/shared/lib/db/db";
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
import { CategoryEntity, CategoryRelationEntity } from "./category.types";

export abstract class ICategoryRepository {
  abstract get(dto: CategoryGetDTO, db?: Tx): Promise<CategoryEntity>;

  abstract getWithRelation(
    dto: CategoryGetDTO,
    db?: Tx,
  ): Promise<CategoryRelationEntity>;

  abstract getBySlug(
    dto: CategoryGetBySlugDTO,
    db?: Tx,
  ): Promise<CategoryEntity>;

  abstract getBySlugRelation(
    dto: CategoryGetBySlugDTO,
    db?: Tx,
  ): Promise<CategoryRelationEntity>;

  abstract getList(db?: Tx): Promise<CategoryEntity[]>;

  abstract create(
    dto: CategoryCreateDTO,
    db?: Tx,
  ): Promise<CategoryEntity>;

  abstract update(
    dto: CategoryUpdateDTO,
    db?: Tx,
  ): Promise<CategoryEntity>;

  abstract remove(
    dto: CategoryRemoveDTO,
    db?: Tx,
  ): Promise<CategoryEntity>;

  abstract removeBySlug(
    dto: CategoryRemoveBySlugDTO,
    db?: Tx,
  ): Promise<CategoryEntity>;

  abstract bindToPropertyList(
    dto: CategoryBindToPropertyListDTO,
    db?: Tx,
  ): Promise<CategoryEntity>;

  abstract bindToProductList(
    dto: CategoryBindToProductListDTO,
    db?: Tx,
  ): Promise<CategoryEntity>;
}
