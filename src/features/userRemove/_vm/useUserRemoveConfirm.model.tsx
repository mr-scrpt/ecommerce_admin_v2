// import { useGetConfirmation } from "@/shared/lib/confirmation";
//
// export const useUserRemoveConfirmModel = () => {
//   const getConfirmation = useGetConfirmation();
//
//   const { userRemove, isPending, isSuccess } = useUserRemoveMutation();
//
//   const removeUserConfirm = async (userId: string) => {
//     const confirmation = await getConfirmation({
//       description:
//         "Do you really want to remove a user? This action cannot be canceled",
//     });
//
//     if (!confirmation) return;
//
//     await userRemove({ userId });
//   };
//
//   return { isPending, isSuccess, removeUserConfirm };
// };
