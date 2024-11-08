import {
  PropertyNotExistError,
  PropertyUnexpectedError,
} from "@/kernel/domain/property/error";
import {
  IPropertyInvariant,
  PropertyExistByListIdInvariant,
  PropertyExistInvariant,
} from "@/kernel/domain/property/invariant.type";
import { ErrorApp } from "@/shared/error/error";
import { ERROR_APP_LAYER } from "@/shared/error/type";
import { DBClient, Tx } from "@/shared/lib/db/db";
import { Either, left, right } from "@sweet-monads/either";
import { injectable } from "inversify";

@injectable()
export class PropertyInvariant implements IPropertyInvariant {
  constructor(private readonly db: DBClient) {}

  async isPropertyExist(
    dto: PropertyExistInvariant,
    db: Tx = this.db,
  ): Promise<Either<ErrorApp, boolean>> {
    const {
      selector: { id },
    } = dto;

    try {
      const res = await db.property.findFirst({
        where: { id },
      });

      if (!res) {
        return left(new PropertyNotExistError({ layer: ERROR_APP_LAYER.DB }));
      }

      return right(true);
    } catch (e) {
      return left(
        new PropertyUnexpectedError({
          cause: e,
          layer: ERROR_APP_LAYER.DB,
        }),
      );
    }
  }

  public async isPropertyListExist(
    dto: PropertyExistByListIdInvariant,
    tx?: Tx,
  ): Promise<Either<ErrorApp, boolean>> {
    const {
      data: { idList },
    } = dto;
    try {
      const result = await Promise.all(
        idList.map((id) => this.isPropertyExist({ selector: { id } }, tx)),
      );

      if (!result.every((res) => res.isRight())) {
        return left(
          new PropertyNotExistError({
            layer: ERROR_APP_LAYER.DB,
            details: JSON.stringify(dto),
          }),
        );
      }

      return right(true);
    } catch (e) {
      return left(
        new PropertyUnexpectedError({
          cause: e,
          layer: ERROR_APP_LAYER.DB,
          details: JSON.stringify(dto),
        }),
      );
    }
  }
  // async isPropertyUniqueByName(
  //   dto: PropertyUniqueByNameInvariant,
  //   db: Tx = this.db,
  // ): Promise<Either<ErrorApp, boolean>> {
  //   const { selector, data } = dto;
  //   try {
  //     const res = await db.property.findFirst({
  //       where: data,
  //     });
  //     // throw new Error("Not Implemented");
  //
  //     if (!res || res.id === selector?.id) {
  //       return right(true);
  //     }
  //
  //     return left(
  //       new PropertyNotUniqueNameError({
  //         layer: ERROR_APP_LAYER.DB,
  //         details: JSON.stringify(dto),
  //       }),
  //     );
  //   } catch (e) {
  //     return left(
  //       new UnexpectedError({
  //         cause: e,
  //         layer: ERROR_APP_LAYER.DB,
  //         details: JSON.stringify(dto),
  //       }),
  //     );
  //   }
  // }
}
