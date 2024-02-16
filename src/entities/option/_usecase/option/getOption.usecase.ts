import { OptionEntity, OptionId } from "../../_domain/types";
import {
  OptionRepository,
  optionRepository,
} from "../../_repository/option.repo";
import { createOptionAbility } from "../../_domain/option/option.ability";
import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";

type GetOption = {
  optionId: OptionId;
  session: SessionEntity;
};

class GetOptionUseCase {
  constructor(private readonly optionRepo: OptionRepository) {}

  async exec(data: GetOption): Promise<OptionEntity> {
    const { optionId, session } = data;
    const { canGetOption } = createOptionAbility(session);

    if (!canGetOption()) {
      throw new AuthorizatoinError();
    }

    return await this.optionRepo.getOption(optionId);
  }
}

export const getOptionUseCase = new GetOptionUseCase(optionRepository);
