"use server";
import { BadRequest } from "@/shared/lib/errors";
import { AVATAR_FILE_KEY } from "../_constant/avatar.constant";
import { z } from "zod";
import { storageFile } from "@/shared/lib/storageFile";

const resultSchema = z.object({
  avatar: z.object({
    path: z.string(),
  }),
});

type ResultT = { avatar: { path: string } };

export const uploadProfileAvatarAction = async (
  formData: FormData,
): Promise<ResultT> => {
  const file = formData.get(AVATAR_FILE_KEY);

  if (!(file instanceof File)) {
    throw new BadRequest();
  }

  const storedFile = await storageFile.uploadImage(file, "avatar");

  return resultSchema.parse({
    avatar: storedFile,
  });
};
