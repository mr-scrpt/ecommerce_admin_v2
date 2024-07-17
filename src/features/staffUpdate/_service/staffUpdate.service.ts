import { injectable } from "inversify";
import { IStaffUpdateTx } from "../_domain/transaction.type";
import { StaffUpdateTxPayload } from "../_domain/types";
import { Staff } from "@/kernel/domain/staff/staff.type";

@injectable()
export class StaffUpdateService {
  constructor(private readonly staffUpdateTx: IStaffUpdateTx) {}

  async execute(payload: StaffUpdateTxPayload): Promise<Staff> {
    return await this.staffUpdateTx.update(payload);
  }
}
