"use server";
import { z } from "zod";
import { propertyRelationSchema } from "../../_domain/property/property.schema";
import { PropertyRelation } from "../../_domain/property/types";
import { getPropertyWithRelationUseCase } from "../../_usecase/instans.usecase";
import { SessionContainer } from "@/shared/session/instans";

const getByIdSchema = z.object({
  propertyId: z.string(),
});

const resultSchema = z.object({
  property: propertyRelationSchema,
});

type ResultT = { property: PropertyRelation };

export const getPropertyWithRelationAction = async (
  props: z.infer<typeof getByIdSchema>,
): Promise<ResultT> => {
  const { propertyId } = getByIdSchema.parse(props);

  const session = await SessionContainer.getStrict();

  const property = await getPropertyWithRelationUseCase.exec({
    session,
    propertyId,
  });

  return resultSchema.parseAsync({
    property,
  });
};
