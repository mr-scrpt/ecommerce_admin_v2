import { StaffEntity } from "@/kernel/domain/staff/staff.type";
import { StaffUpdateTxDTO } from "./types";

export abstract class IStaffUpdateTx {
  abstract update(dto: StaffUpdateTxDTO): Promise<StaffEntity>;
}
