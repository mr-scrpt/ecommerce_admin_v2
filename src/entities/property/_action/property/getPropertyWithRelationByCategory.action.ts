"use server";
import { getAppSessionStrictServer } from "@/shared/session/getAppSessionServer";
import { z } from "zod";
import { propertyRelationSchema } from "../../_domain/property/property.schema";
import { PropertyRelation } from "../../_domain/property/types";
import { getPropertyWithRelationByCategoryUseCase } from "../../_usecase/property/getPropertyWithRelationByCategory.usecase";

const getByIdSchema = z.object({
  categoryIdList: z.array(z.string()),
});

const resultSchema = z.object({
  propertyList: z.array(propertyRelationSchema),
});

type ResultT = { propertyList: PropertyRelation[] };

export const getPropertyWithRelationByCategoryAction = async (
  props: z.infer<typeof getByIdSchema>,
): Promise<ResultT> => {
  const { categoryIdList } = getByIdSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const propertyList = await getPropertyWithRelationByCategoryUseCase.exec({
    session,
    categoryIdList,
  });

  return resultSchema.parseAsync({
    propertyList,
  });
};
