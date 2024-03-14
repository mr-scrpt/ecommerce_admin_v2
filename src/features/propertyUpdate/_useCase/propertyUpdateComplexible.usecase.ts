import { PropertyEntity } from "@/entities/property";
import { ForbiddenError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { PropertyUpdateComplexible } from "../_domain/types";
import {
  PropertyUpdateTx,
  propertyUpdateTx,
} from "../_tx/propertyUpdate.transaction";
import { createPropertyAbility } from "@/entities/property/server";

type UpdateProperty = {
  dataToUpdate: PropertyUpdateComplexible;
  session: SessionEntity;
};

class UpdatePropertyComplexibleUseCase {
  constructor(private readonly propertyUpdateTx: PropertyUpdateTx) {}

  async exec(data: UpdateProperty): Promise<PropertyEntity> {
    const { session, dataToUpdate } = data;
    const { canUpdateProperty } = createPropertyAbility(session);

    if (!canUpdateProperty()) {
      throw new ForbiddenError();
    }

    return await this.propertyUpdateTx.updatePropertyById(dataToUpdate);
  }
}

export const updatePropertyComplexibleUseCase =
  new UpdatePropertyComplexibleUseCase(propertyUpdateTx);
