import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { createOptionAbility } from "../../_domain/option/option.ability";
import { OptionEntity } from "../../_domain/types";
import {
  OptionRepository,
  optionRepository,
} from "../../_repository/option.repo";

type GetOptionList = {
  session: SessionEntity;
};

class GetOptionListUseCase {
  constructor(private readonly optionRepo: OptionRepository) {}

  async exec(data: GetOptionList): Promise<OptionEntity[]> {
    const { session } = data;
    const { canGetOption } = createOptionAbility(session);

    if (!canGetOption()) {
      throw new AuthorizatoinError();
    }

    return await this.optionRepo.getOptionList();
  }
}

export const getOptionListUseCase = new GetOptionListUseCase(optionRepository);
