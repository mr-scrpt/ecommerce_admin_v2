import { ForbiddenError } from "@/shared/lib/errors";
import { PropertyRemoveTx } from "../_tx/propertyRemove.transaction";
import { PropertyEntity, PropertyId } from "@/entities/property";
import { SessionEntity } from "@/shared/lib/user";
import { createPropertyAbility } from "@/entities/property/server";
import { injectable } from "inversify";

type RemoveProperty = {
  propertyId: PropertyId;
  session: SessionEntity;
};

@injectable()
export class RemovePropertyComplexibleUseCase {
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
