import { StaffUpdateDTO } from "@/kernel/domain/staff/staff.dto";
import { StaffBase } from "@/kernel/domain/staff/staff.type";

type StaffUpdatePayload = Partial<StaffBase>;

export type StaffUpdateTxPayload = {
  selector: StaffUpdateSelector;
  staffData: StaffUpdatePayload;
};

export type StaffUpdateTxDTO = {
  selector: StaffUpdateSelector;
  staffData: StaffUpdateDTO["data"];
};

// NOTE: Selector
export type StaffUpdateSelector = {
  id: string;
};
