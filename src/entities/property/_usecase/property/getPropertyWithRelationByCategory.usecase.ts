import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { createPropertyAbility } from "../../_domain/property/property.ability";
import { PropertyRelationEntity } from "../../_domain/property/types";
import {
  PropertyRepository,
  propertyRepository,
} from "../../_repository/property.repo";

type GetPropertyWithRelation = {
  categoryIdList: Array<string>;
  session: SessionEntity;
};

class GetPropertyWithRelationByCategoryUseCase {
  constructor(private readonly propertyRepo: PropertyRepository) {}

  async exec(data: GetPropertyWithRelation): Promise<PropertyRelationEntity[]> {
    const { categoryIdList, session } = data;
    const { canGetProperty } = createPropertyAbility(session);

    if (!canGetProperty()) {
      throw new AuthorizatoinError();
    }

    return await this.propertyRepo.getPropertyWithRelationByCategory(
      categoryIdList,
    );
  }
}

export const getPropertyWithRelationByCategoryUseCase =
  new GetPropertyWithRelationByCategoryUseCase(propertyRepository);
