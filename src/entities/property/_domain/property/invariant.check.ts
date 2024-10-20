import { PropertyNotExistError } from "@/kernel/domain/property/error";
import {
  IPropertyInvariant,
  PropertyExistByListIdInvariant,
  PropertyExistInvariant,
} from "@/kernel/domain/property/invariant.type";
import { IPropertyRepository } from "@/kernel/domain/property/repository.type";
import { ErrorApp } from "@/shared/error/error";
import { Tx } from "@/shared/lib/db/db";
import { Either, left, right } from "@sweet-monads/either";
import { injectable } from "inversify";

@injectable()
export class PropertyInvariant implements IPropertyInvariant {
  constructor(readonly propertyRepo: IPropertyRepository) {}

  public async isPropertyExist(
    invariantData: PropertyExistInvariant,
    tx?: Tx,
  ): Promise<Either<ErrorApp, boolean>> {
    const {
      data: { id },
    } = invariantData;
    const isPropertyExist = await this.propertyRepo.get({ id }, tx);

    if (!isPropertyExist.isRight()) {
      return left(new PropertyNotExistError());
    }

    return right(true);
  }

  public async isPropertyListExist(
    invariantData: PropertyExistByListIdInvariant,
    tx?: Tx,
  ): Promise<Either<ErrorApp, boolean>> {
    const {
      data: { idList },
    } = invariantData;
    const result = await Promise.all(
      idList.map((id) => this.isPropertyExist({ data: { id } }, tx)),
    );

    if (!result.every((res) => res.isRight())) {
      return left(new PropertyNotExistError());
    }

    return right(true);
  }
}
