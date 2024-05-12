"use server";
import { z } from "zod";
import { propertySchema } from "../../_domain/property/property.schema";
import { Property } from "../../_domain/property/types";
import { getPropertyUseCase } from "../../_usecase/instans.usecase";
import { SessionContainer } from "@/shared/session/instans";

const propsSchema = z.object({
  propertyId: z.string(),
});

const resultSchema = z.object({
  property: propertySchema,
});

type ResultT = { property: Property };

export const getPropertyAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { propertyId } = propsSchema.parse(props);

  const session = await SessionContainer.getStrict();

  const property = await getPropertyUseCase.exec({
    session,
    propertyId,
  });

  return resultSchema.parseAsync({
    property: property,
  });
};
