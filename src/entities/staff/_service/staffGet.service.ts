import { injectable } from "inversify";
import { StaffEntity } from "@/kernel/domain/staff/staff.type";
import { IStaffRepository } from "@/kernel/domain/staff/repository.type";
import { StaffGetSelector } from "../_domain/staff.type";

@injectable()
export class StaffGetService {
  constructor(private readonly staffRepo: IStaffRepository) {}

  async execute(selector: StaffGetSelector): Promise<StaffEntity> {
    return await this.staffRepo.get(selector);
  }
}
