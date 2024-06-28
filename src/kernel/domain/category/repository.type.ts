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
} from "./category.dto";
import { CategoryEntity } from "./category.type";

export abstract class ICategoryRepository {
  abstract get(dto: CategoryGetDTO, db?: Tx): Promise<CategoryEntity>;

  abstract getWithRelation<T>(dto: CategoryGetDTO, db?: Tx): Promise<T>;

  abstract getBySlug(
    dto: CategoryGetBySlugDTO,
    db?: Tx,
  ): Promise<CategoryEntity>;

  abstract getBySlugRelation<T>(dto: CategoryGetBySlugDTO, db?: Tx): Promise<T>;

  abstract getList(db?: Tx): Promise<CategoryEntity[]>;

  abstract create(dto: CategoryCreateDTO, db?: Tx): Promise<CategoryEntity>;

  abstract update(dto: CategoryUpdateDTO, db?: Tx): Promise<CategoryEntity>;

  abstract remove(dto: CategoryRemoveDTO, db?: Tx): Promise<CategoryEntity>;

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
