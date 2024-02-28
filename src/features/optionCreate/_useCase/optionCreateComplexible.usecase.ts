import { OptionEntity, createOptionAbility } from "@/entities/property";
import { ForbiddenError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { OptionCreateComplexible } from "../_domain/types";
import {
  OptionCreateTx,
  optionCreateTx,
} from "../_tx/optionCreate.transaction";

type CreateOption = {
  dataToCreate: OptionCreateComplexible;
  session: SessionEntity;
};

class CreateOptionComplexibleUseCase {
  constructor(private readonly optionCreateTx: OptionCreateTx) {}

  async exec(data: CreateOption): Promise<OptionEntity> {
    const { dataToCreate, session } = data;

    const { canCreateOption } = createOptionAbility(session);

    if (!canCreateOption()) {
      throw new ForbiddenError();
    }

    return await this.optionCreateTx.createOptionComplexible(dataToCreate);
  }
}

export const createOptionComplexibleUseCase =
  new CreateOptionComplexibleUseCase(optionCreateTx);
