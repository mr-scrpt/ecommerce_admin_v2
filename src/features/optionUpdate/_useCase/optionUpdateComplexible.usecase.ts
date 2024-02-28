import { createOptionAbility } from "@/entities/property";
import { ForbiddenError } from "@/shared/lib/errors";
import {
  OptionUpdateTx,
  optionUpdateTx,
} from "../_tx/optionUpdate.transaction";
import { OptionEntity, OptionId } from "@/entities/property";
import { SessionEntity } from "@/shared/lib/user";
import { OptionUpdateComplexible } from "../_domain/types";

type UpdateOption = {
  dataToUpdate: OptionUpdateComplexible;
  session: SessionEntity;
};

class UpdateOptionComplexibleUseCase {
  constructor(private readonly optionUpdateTx: OptionUpdateTx) {}

  async exec(data: UpdateOption): Promise<OptionEntity> {
    const { session, dataToUpdate } = data;
    const { canUpdateOption } = createOptionAbility(session);

    if (!canUpdateOption()) {
      throw new ForbiddenError();
    }

    return await this.optionUpdateTx.updateOptionById(dataToUpdate);
  }
}

export const updateOptionComplexibleUseCase =
  new UpdateOptionComplexibleUseCase(optionUpdateTx);
