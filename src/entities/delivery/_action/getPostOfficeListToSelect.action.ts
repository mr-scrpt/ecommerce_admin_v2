"use server";
import { getAppSessionStrictServer } from "@/kernel/lib/nextauth/server";
import { z } from "zod";
import { postOfficeToSelectSchema } from "../_domain/postOffice.schema";
import { PostOfficeToSelect } from "../_domain/postOffice.type";
import { getPostOfficeListToSelectUseCase } from "../_usecase/instans.usecase";

const propsSchema = z.object({
  settlement: z.string(),
});
const resultSchema = z.object({
  postOfficeListToSelect: postOfficeToSelectSchema.array(),
});

type ResultT = { postOfficeListToSelect: PostOfficeToSelect[] };

export const getPostOfficeListToSelectAction = async (
  porps: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { settlement } = propsSchema.parse(porps);
  const session = await getAppSessionStrictServer();

  const postOfficeListToSelect = await getPostOfficeListToSelectUseCase.exec({
    session,
    settlement,
  });

  return resultSchema.parseAsync({
    postOfficeListToSelect,
  });
};
