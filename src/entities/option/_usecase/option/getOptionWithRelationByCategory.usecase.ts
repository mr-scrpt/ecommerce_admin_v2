import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { createOptionAbility } from "../../_domain/option/option.ability";
import { OptionRelationEntity } from "../../_domain/option/types";
import {
  OptionRepository,
  optionRepository,
} from "../../_repository/option.repo";

type GetOptionWithRelation = {
  categoryIdList: Array<string>;
  session: SessionEntity;
};

class GetOptionWithRelationByCategoryUseCase {
  constructor(private readonly optionRepo: OptionRepository) {}

  async exec(data: GetOptionWithRelation): Promise<OptionRelationEntity[]> {
    const { categoryIdList, session } = data;
    const { canGetOption } = createOptionAbility(session);

    if (!canGetOption()) {
      throw new AuthorizatoinError();
    }

    return await this.optionRepo.getOptionWithRelationByCategory(
      categoryIdList,
    );
  }
}

export const getOptionWithRelationByCategoryUseCase =
  new GetOptionWithRelationByCategoryUseCase(optionRepository);
