"use server";
import { BadRequestError } from "@/kernel/error/error.common";
import { storageFile } from "@/shared/lib/storageFile";
import { z } from "zod";
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
      throw new BadRequestError({ message: "File not be uploaded" });
    }
    try {
      const storedFile = await storageFile.uploadImage(file, "CategoryBoard");
      fileListUploaded.push(storedFile);
    } catch (e) {
      console.log("output_log: error =>>>", e);
    }
  }

  return resultSchema.parse({
    boardList: {
      path: fileListUploaded.map((item) => item.path),
    },
  });
};
