import {
  OptionRelation,
  OptionRelationEntity,
  createOptionAbility,
} from "@/entities/option";
import { ForbiddenError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import {
  OptionCreateTx,
  optionCreateTx,
} from "../_tx/optionCreate.transaction";

type CreateOption = {
  optionData: OptionRelation;
  session: SessionEntity;
};

class CreateOptionComplexibleUseCase {
  constructor(private readonly optionCreateTx: OptionCreateTx) {}

  async exec(data: CreateOption): Promise<OptionRelationEntity> {
    const { optionData, session } = data;
    const { canCreateOption } = createOptionAbility(session);

    if (!canCreateOption()) {
      throw new ForbiddenError();
    }

    return await this.optionCreateTx.createOptionComplexible(optionData);
  }
}

export const createOptionComplexibleUseCase =
  new CreateOptionComplexibleUseCase(optionCreateTx);
