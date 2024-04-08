import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import {
  PropertyId,
  PropertyRelationEntity,
} from "../../_domain/property/types";
import { PropertyRepository } from "../../_repository/property.repo";
import { createPropertyAbility } from "../../_domain/property/property.ability";
import { injectable } from "inversify";

type GetPropertyWithRelation = {
  propertyId: PropertyId;
  session: SessionEntity;
};

@injectable()
export class GetPropertyWithRelationUseCase {
  constructor(private readonly propertyRepo: PropertyRepository) {}

  async exec(data: GetPropertyWithRelation): Promise<PropertyRelationEntity> {
    const { propertyId, session } = data;
    const { canGetProperty } = createPropertyAbility(session);

    if (!canGetProperty()) {
      throw new AuthorizatoinError();
    }

    return await this.propertyRepo.getPropertyWithRelation(propertyId);
  }
}
