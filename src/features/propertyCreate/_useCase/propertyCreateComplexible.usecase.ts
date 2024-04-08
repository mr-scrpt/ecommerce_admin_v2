import { PropertyEntity } from "@/entities/property";
import { ForbiddenError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { PropertyCreateComplexible } from "../_domain/types";
import { PropertyCreateTx } from "../_tx/propertyCreate.transaction";
import { createPropertyAbility } from "@/entities/property/server";
import { injectable } from "inversify";

type CreateProperty = {
  dataToCreate: PropertyCreateComplexible;
  session: SessionEntity;
};

@injectable()
export class CreatePropertyComplexibleUseCase {
  constructor(private readonly propertyCreateTx: PropertyCreateTx) {}

  async exec(data: CreateProperty): Promise<PropertyEntity> {
    const { dataToCreate, session } = data;

    const { canCreateProperty } = createPropertyAbility(session);

    if (!canCreateProperty()) {
      throw new ForbiddenError();
    }

    return await this.propertyCreateTx.createPropertyComplexible(dataToCreate);
  }
}
