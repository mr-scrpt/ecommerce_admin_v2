import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { createOptionAbility } from "../../_domain/option/option.ability";
import { Option, OptionEntity } from "../../_domain/types";
import {
  OptionRepository,
  optionRepository,
} from "../../_repository/option.repo";

type CreateOption = {
  session: SessionEntity;
  optionData: Option;
};

class CreateOptionUseCase {
  constructor(private readonly optionRepo: OptionRepository) {}

  async exec(data: CreateOption): Promise<OptionEntity> {
    const { optionData, session } = data;
    const { canCreateOption } = createOptionAbility(session);

    if (!canCreateOption()) {
      throw new AuthorizatoinError();
    }

    return await this.optionRepo.createOption(optionData);
  }
}

export const createOptionUseCase = new CreateOptionUseCase(optionRepository);
