"use client";
import { notice, noticeError } from "@/shared/ui/notice/notice";
import { useCategoryCreateMutation } from "../_mutation/useCategoryCreate.mutation";
import { useEffect } from "react";

export const useCategoryCreateModel = () => {
  const { categoryCreate, isSuccess, isPending, isError, error } =
    useCategoryCreateMutation();

  useEffect(() => {
    if (isSuccess) {
      notice({ title: "Success", description: "Category has been created" });
    }

    if (isError && error) {
      noticeError({ title: "Error", description: error.message });
    }
  }, [isSuccess, isError, error]);
  return {
    categoryCreate,
    isPending,
    isSuccess,
  };
};
