import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { StaffUpdateTxDTO } from "../_domain/types";
import { IStaffUpdateTx } from "../_domain/transaction.type";
import { StaffEntity } from "@/kernel/domain/staff/staff.type";
import { IStaffRepository } from "@/kernel/domain/staff/repository.type";

@injectable()
export class StaffUpdateTx extends Transaction implements IStaffUpdateTx {
  constructor(
    readonly db: DBClient,
    private readonly staffRepo: IStaffRepository,
  ) {
    super(db);
  }

  async update(dto: StaffUpdateTxDTO): Promise<StaffEntity> {
    const { selector, staffData } = dto;
    const action = async (tx: Tx) => {
      return await this.staffRepo.update({ selector, data: staffData }, tx);
    };

    return await this.start(action);
  }
}
