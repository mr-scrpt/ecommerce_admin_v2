import { Tx } from "@/shared/lib/db/db";
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

export abstract class ICategoryRepository {
  abstract getCategory(dto: CategoryGetDTO, db?: Tx): Promise<CategoryEntity>;

  abstract getCategoryRelation(
    dto: CategoryGetDTO,
    db?: Tx,
  ): Promise<CategoryRelationEntity>;

  abstract getCategoryBySlug(
    dto: CategoryGetBySlugDTO,
    db?: Tx,
  ): Promise<CategoryEntity>;

  abstract getCategoryBySlugRelation(
    dto: CategoryGetBySlugDTO,
    db?: Tx,
  ): Promise<CategoryRelationEntity>;

  abstract getCategoryList(db?: Tx): Promise<CategoryEntity[]>;

  abstract createCategory(
    dto: CategoryCreateDTO,
    db?: Tx,
  ): Promise<CategoryEntity>;

  abstract updateCategory(
    dto: CategoryUpdateDTO,
    db?: Tx,
  ): Promise<CategoryEntity>;

  abstract removeCategory(
    dto: CategoryRemoveDTO,
    db?: Tx,
  ): Promise<CategoryEntity>;

  abstract removeCategoryBySlug(
    dto: CategoryRemoveBySlugDTO,
    db?: Tx,
  ): Promise<CategoryEntity>;

  abstract bindCategoryPropertyList(
    dto: CategoryBindPropertyListDTO,
    db?: Tx,
  ): Promise<CategoryEntity>;

  abstract bindCategoryProductList(
    dto: CategoryBindProductListDTO,
    db?: Tx,
  ): Promise<CategoryEntity>;
}
