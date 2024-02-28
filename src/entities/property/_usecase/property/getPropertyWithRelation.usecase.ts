import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import {
  PropertyId,
  PropertyRelationEntity,
} from "../../_domain/property/types";
import {
  PropertyRepository,
  propertyRepository,
} from "../../_repository/property.repo";
import { createPropertyAbility } from "../../_domain/property/property.ability";

type GetPropertyWithRelation = {
  propertyId: PropertyId;
  session: SessionEntity;
};

class GetPropertyWithRelationUseCase {
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

export const getPropertyWithRelationUseCase =
  new GetPropertyWithRelationUseCase(propertyRepository);
