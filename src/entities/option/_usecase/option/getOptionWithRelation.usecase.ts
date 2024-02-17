import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { OptionId, OptionRelationEntity } from "../../_domain/types";
import {
  OptionRepository,
  optionRepository,
} from "../../_repository/option.repo";
import { createOptionAbility } from "../../_domain/option/option.ability";

type GetOptionWithRelation = {
  optionId: OptionId;
  session: SessionEntity;
};

class GetOptionWithRelationUseCase {
  constructor(private readonly optionRepo: OptionRepository) {}

  async exec(data: GetOptionWithRelation): Promise<OptionRelationEntity> {
    const { optionId, session } = data;
    const { canGetOption } = createOptionAbility(session);

    if (!canGetOption()) {
      throw new AuthorizatoinError();
    }

    return await this.optionRepo.getOptionWithRelation(optionId);
  }
}

export const getOptionWithRelationUseCase = new GetOptionWithRelationUseCase(
  optionRepository,
);
