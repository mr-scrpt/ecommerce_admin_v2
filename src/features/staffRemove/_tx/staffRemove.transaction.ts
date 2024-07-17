import { StaffEntity } from "@/kernel/domain/staff/staff.type";
import { IStaffRepository } from "@/kernel/domain/staff/repository.type";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { IStaffRemoveTx } from "../_domain/transaction.type";
import { StaffRemoveTxDTO } from "../_domain/types";

@injectable()
export class StaffRemoveTx extends Transaction implements IStaffRemoveTx {
  constructor(
    readonly db: DBClient,
    private readonly staffRepo: IStaffRepository,
  ) {
    super(db);
  }

  async remove(dto: StaffRemoveTxDTO): Promise<StaffEntity> {
    const action = async (tx: Tx) => {
      return await this.staffRepo.remove(dto, tx);
    };

    return await this.start(action);
  }
}
