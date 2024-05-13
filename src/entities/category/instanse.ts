import { initModule } from "@/app/module";
import { GetCategoryListService } from "./_service/getCategoryList.service";

export const categoryListService = initModule.get(GetCategoryListService);
