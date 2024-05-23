"use server";
import { BadRequest } from "@/shared/lib/errors";
import { z } from "zod";
import { storageFile } from "@/shared/lib/storageFile";
import { BOARD_LIST_FILE_KEY } from "../_constant/formData.contstant";

const resultSchema = z.object({
  boardList: z.object({
    path: z.array(z.string()),
  }),
});

export const uploadBoardListAction = async (formData: FormData) => {
  const files = formData.getAll(BOARD_LIST_FILE_KEY);

  const fileListUploaded = [];
  for (const file of files) {
    if (!(file instanceof File)) {
      throw new BadRequest();
    }
    const storedFile = await storageFile.uploadImage(file, "avatar");
    fileListUploaded.push(storedFile);
  }

  return resultSchema.parse({
    boardList: {
      path: fileListUploaded.map((item) => item.path),
    },
  });
};
