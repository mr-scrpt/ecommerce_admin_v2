import { PropertyEntity, PropertyId } from "../../_domain/property/types";
import {
  PropertyRepository,
  propertyRepository,
} from "../../_repository/property.repo";
import { createPropertyAbility } from "../../_domain/property/property.ability";
import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";

type GetProperty = {
  propertyId: PropertyId;
  session: SessionEntity;
};

class GetPropertyUseCase {
  constructor(private readonly propertyRepo: PropertyRepository) {}

  async exec(data: GetProperty): Promise<PropertyEntity> {
    const { propertyId, session } = data;
    const { canGetProperty } = createPropertyAbility(session);

    if (!canGetProperty()) {
      throw new AuthorizatoinError();
    }

    return await this.propertyRepo.getProperty(propertyId);
  }
}

export const getPropertyUseCase = new GetPropertyUseCase(propertyRepository);
