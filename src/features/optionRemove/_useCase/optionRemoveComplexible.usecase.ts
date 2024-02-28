import { createOptionAbility } from "@/entities/property";
import { ForbiddenError } from "@/shared/lib/errors";
import {
  OptionRemoveTx,
  optionRemoveTx,
} from "../_tx/optionRemove.transaction";
import { OptionEntity, OptionId } from "@/entities/property";
import { SessionEntity } from "@/shared/lib/user";

type RemoveOption = {
  optionId: OptionId;
  session: SessionEntity;
};

class RemoveOptionComplexibleUseCase {
  constructor(private readonly optionRemoveTx: OptionRemoveTx) {}

  async exec(data: RemoveOption): Promise<OptionEntity> {
    const { optionId, session } = data;
    const { canRemoveOption } = createOptionAbility(session);

    if (!canRemoveOption()) {
      throw new ForbiddenError();
    }

    return await this.optionRemoveTx.removeOptionById(optionId);
  }
}

export const removeOptionComplexibleUseCase =
  new RemoveOptionComplexibleUseCase(optionRemoveTx);
