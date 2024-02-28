import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { createPropertyAbility } from "../../_domain/property/property.ability";
import { PropertyEntity } from "../../_domain/property/types";
import {
  PropertyRepository,
  propertyRepository,
} from "../../_repository/property.repo";

type GetPropertyList = {
  session: SessionEntity;
};

class GetPropertyListUseCase {
  constructor(private readonly propertyRepo: PropertyRepository) {}

  async exec(data: GetPropertyList): Promise<PropertyEntity[]> {
    const { session } = data;
    const { canGetProperty } = createPropertyAbility(session);

    if (!canGetProperty()) {
      throw new AuthorizatoinError();
    }

    return await this.propertyRepo.getPropertyList();
  }
}

export const getPropertyListUseCase = new GetPropertyListUseCase(
  propertyRepository,
);
