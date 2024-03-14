import { ForbiddenError } from "@/shared/lib/errors";
import {
  PropertyRemoveTx,
  propertyRemoveTx,
} from "../_tx/propertyRemove.transaction";
import { PropertyEntity, PropertyId } from "@/entities/property";
import { SessionEntity } from "@/shared/lib/user";
import { createPropertyAbility } from "@/entities/property/server";

type RemoveProperty = {
  propertyId: PropertyId;
  session: SessionEntity;
};

class RemovePropertyComplexibleUseCase {
  constructor(private readonly propertyRemoveTx: PropertyRemoveTx) {}

  async exec(data: RemoveProperty): Promise<PropertyEntity> {
    const { propertyId, session } = data;
    const { canRemoveProperty } = createPropertyAbility(session);

    if (!canRemoveProperty()) {
      throw new ForbiddenError();
    }

    return await this.propertyRemoveTx.removePropertyById(propertyId);
  }
}

export const removePropertyComplexibleUseCase =
  new RemovePropertyComplexibleUseCase(propertyRemoveTx);
