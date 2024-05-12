"use server";
import { SessionContainer } from "@/shared/session/instans";
import { z } from "zod";
import { userStrictSchema } from "../_domain/user.schema";
import { UserStrict } from "../_domain/user.types";
import { getUserListSearchUseCase } from "../_useCase/instans.usecase";

const propsSchema = z.object({
  q: z.string(),
});

const resultSchema = z.object({
  userList: z.array(userStrictSchema),
});

type ResultT = { userList: Array<UserStrict> };

export const getUserStrictListSearchAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { q } = props;
  const session = await SessionContainer.getStrict();

  const userList = await getUserListSearchUseCase.exec({
    q,
    session,
  });

  return resultSchema.parseAsync({
    userList: userList,
  });
};
