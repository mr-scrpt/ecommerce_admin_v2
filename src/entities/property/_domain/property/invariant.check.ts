import { PropertyNotExistError } from "@/kernel/domain/property/error";
import { IPropertyInvariant } from "@/kernel/domain/property/invariant.type";
import { IPropertyRepository } from "@/kernel/domain/property/repository.type";
import { ErrorApp } from "@/shared/error/error";
import { Tx } from "@/shared/lib/db/db";
import { Either, left, right } from "@sweet-monads/either";
import { injectable } from "inversify";

@injectable()
export class PropertyInvariant implements IPropertyInvariant {
  constructor(readonly propertyRepo: IPropertyRepository) {}

  public async isPropertyExist(
    id: string,
    tx?: Tx,
  ): Promise<Either<ErrorApp, boolean>> {
    const isPropertyExist = await this.propertyRepo.get({ id }, tx);

    if (!isPropertyExist.isRight()) {
      console.log(isPropertyExist.value);
      return left(new PropertyNotExistError());
    }

    return right(true);
  }

  public async isPropertyListExist(
    idList: string[],
    tx?: Tx,
  ): Promise<Either<ErrorApp, boolean>> {
    const resutl = await Promise.all(
      idList.map((id) => this.isPropertyExist(id, tx)),
    );

    if (!resutl.every((res) => res.isRight())) {
      return left(new PropertyNotExistError());
    }

    return right(true);
  }
}
