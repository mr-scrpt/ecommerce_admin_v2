import { StaffGetByOrderSelector, StaffRelationEntity } from "./staff.type";

export abstract class IStaffRelationGetByOrderTx {
  abstract getStaffByOrder(
    selector: StaffGetByOrderSelector,
  ): Promise<StaffRelationEntity>;
}
