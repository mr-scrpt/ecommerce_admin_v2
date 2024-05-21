// "use client";
// import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
// import { Category, baseQueryKey } from "../_domain/types";
// import { useListenCategoryListUpdate } from "../_vm/event/useListenCategoryListUpdate";
// import { useGetServerAction } from "@/shared/lib/serverAction";
//
// export const useGetCategoryListQuery = () => {
//   const { getCategoryList } = useGetServerAction<{
//     getCategoryList: () => Promise<{ categoryList: Category[] }>;
//   }>();
//   return queryOptions({
//     queryKey: [baseQueryKey, "getCategoryList"],
//     queryFn: () => getCategoryList(),
//     // queryFn: () => [],
//   });
// };
//
// export const useCategoryListQuery = () => {
//   const query = useGetCategoryListQuery();
//   const { isPending, isSuccess, isFetchedAfterMount, data } = useQuery(query);
//
//   useListenCategoryListUpdate();
//
//   return {
//     isPending,
//     isSuccess,
//     isFetchedAfterMount,
//     categoryList: data ? data.categoryList : [],
//   };
// };
//
// export const useInvalidateCategoryList = () => {
//   const queryClient = useQueryClient();
//
//   return () =>
//     queryClient.invalidateQueries({
//       queryKey: [baseQueryKey, "getCategoryList"],
//     });
// };
