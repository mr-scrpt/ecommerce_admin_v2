"use server";
import { getAppSessionStrictServer } from "@/entities/user/getAppSessionServer";
import { z } from "zod";
import { Property } from "../../_domain/property/types";
import { propertySchema } from "../../_domain/property/property.schema";
import { getPropertyListUseCase } from "../../_usecase/property/getPropertyList.usecase";

const resultSchema = z.object({
  propertyList: z.array(propertySchema),
});

type ResultT = { propertyList: Property[] };

export const getPropertyListAction = async (): Promise<ResultT> => {
  const session = await getAppSessionStrictServer();

  const propertyList = await getPropertyListUseCase.exec({ session });

  return resultSchema.parseAsync({
    propertyList: propertyList,
  });
};
