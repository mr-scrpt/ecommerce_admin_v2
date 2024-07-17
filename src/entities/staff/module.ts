import { IStaffRepository } from "@/kernel/domain/staff/repository.type";
import { Controller } from "@/kernel/lib/trpc/server";
import { ContainerModule } from "inversify";
import { StaffRepository } from "./_repository/staff.repo";
import { StaffController } from "./_controller/staff.controller";
import { StaffListSearchService } from "./_service/staffListSearch.service";
import { StaffListService } from "./_service/staffList.service";
import { StaffGetService } from "./_service/staffGet.service";

export const StaffModule = new ContainerModule((bind) => {
  bind(IStaffRepository).to(StaffRepository);

  bind(StaffGetService).toSelf();
  bind(StaffListService).toSelf();
  bind(StaffListSearchService).toSelf();

  bind(Controller).to(StaffController);
});
