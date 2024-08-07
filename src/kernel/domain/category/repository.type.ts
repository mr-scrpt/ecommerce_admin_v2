import { Tx } from "@/shared/lib/db/db";
import { Either } from "@sweet-monads/either";
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
import { CategoryNotFoundError } from "./error";

export abstract class ICategoryRepository {
  abstract get(
    dto: CategoryGetDTO,
    db?: Tx,
  ): Promise<Either<CategoryNotFoundError, CategoryEntity>>;

  abstract getWithRelation<T>(
    dto: CategoryGetDTO,
    db?: Tx,
  ): Promise<Either<CategoryNotFoundError, T>>;

  abstract getBySlug(
    dto: CategoryGetBySlugDTO,
    db?: Tx,
  ): Promise<CategoryEntity>;

  abstract getBySlugRelation<T>(
    dto: CategoryGetBySlugDTO,
    db?: Tx,
  ): Promise<Either<CategoryNotFoundError, T>>;

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
