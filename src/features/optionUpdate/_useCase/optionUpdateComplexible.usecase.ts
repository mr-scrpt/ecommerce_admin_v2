import { createOptionAbility } from "@/entities/option";
import { ForbiddenError } from "@/shared/lib/errors";
import {
  OptionUpdateTx,
  optionUpdateTx,
} from "../_tx/optionUpdate.transaction";
import { OptionEntity, OptionId } from "@/entities/option";
import { SessionEntity } from "@/shared/lib/user";
import { OptionItemEntity } from "@/entities/option/_domain/option/types";

type UpdateOption = {
  data: {
    optionId: OptionId;
    optionData: Partial<OptionEntity>;
    optionItemList: Partial<OptionItemEntity>[];
  };
  session: SessionEntity;
};

class UpdateOptionComplexibleUseCase {
  constructor(private readonly optionUpdateTx: OptionUpdateTx) {}

  async exec(data: UpdateOption): Promise<OptionEntity> {
    const { optionId, session } = data;
    const { canUpdateOption } = createOptionAbility(session);

    if (!canUpdateOption()) {
      throw new ForbiddenError();
    }

    return await this.optionUpdateTx.updateOptionById(optionId);
  }
}

export const updateOptionComplexibleUseCase =
  new UpdateOptionComplexibleUseCase(optionUpdateTx);
