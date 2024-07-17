import { Staff } from "@/kernel/domain/staff/staff.type";
import { injectable } from "inversify";
import { IStaffRemoveTx } from "../_domain/transaction.type";
import { StaffRemoveTxPayload } from "../_domain/types";

@injectable()
export class StaffRemoveService {
  constructor(private readonly staffRemoveTx: IStaffRemoveTx) {}

  async execute(selector: StaffRemoveTxPayload): Promise<Staff> {
    return await this.staffRemoveTx.remove(selector);
  }
}
