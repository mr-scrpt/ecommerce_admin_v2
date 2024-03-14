import { PropertyEntity } from "@/entities/property";
import { ForbiddenError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { PropertyCreateComplexible } from "../_domain/types";
import {
  PropertyCreateTx,
  propertyCreateTx,
} from "../_tx/propertyCreate.transaction";
import { createPropertyAbility } from "@/entities/property/server";

type CreateProperty = {
  dataToCreate: PropertyCreateComplexible;
  session: SessionEntity;
};

class CreatePropertyComplexibleUseCase {
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

export const createPropertyComplexibleUseCase =
  new CreatePropertyComplexibleUseCase(propertyCreateTx);
