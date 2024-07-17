import { StaffEntity } from "@/kernel/domain/staff/staff.type";
import { StaffRemoveTxDTO } from "./types";

export abstract class IStaffRemoveTx {
  abstract remove(dto: StaffRemoveTxDTO): Promise<StaffEntity>;
}
