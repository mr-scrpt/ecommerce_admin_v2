"use server";
import { initModule } from "./module";
export const serviceExecutors = async () => {
  return initModule;
};
// import {
//   categoryService,
//   categoryListService,
//   CategoryPayload,
// } from "@/entities/category/instanse";
//
// export const serviceExecutors = {
//   getCategoryList: async () => await categoryListService(),
//   getCategory: async (props: CategoryPayload) => await categoryService(props),
// };
//
// import { Service } from "./initAction";
// import { GetCategoryListService } from "@/entities/category/server";
//
// // export const serviceList = async () => {
// //   // const serviceList = initModule.getAll(Service);
// //   const serviceList = initModule.getAll(GetCategoryListService);
// //   // const serviceList = initModule.get(GetCategoryListService);
// //   // return serviceList.map((c) => c.execute());
// //   // return serviceList;
// //   console.log("output_log: service list = =>>>", serviceList);
// //   // return serviceList;
// //   return [];
// // };
//
// const serviceList = initModule.getAll(GetCategoryListService);
// // console.log("output_log: service list = =>>>", serviceList);
// console.log(
//   "output_log: service list = =>>>",
//   // serviceList.map((c) => console.log(c)),
// );
//
// const serviceExecutors: Record<string, (...args: any[]) => Promise<any>> = {};
//
// // serviceList().then((serviceList) =>
// //   serviceList.forEach((serviceInstance, index) => {
// //     const serviceName = serviceInstance.constructor.name;
// //     serviceExecutors[serviceName] =
// //       serviceInstance.execute.bind(serviceInstance);
// //   }),
// // );
// export const getService = async () => serviceExecutors;
//
// // export const getService = async () => {
// //   return serviceExecutors;
// // };
//
// // export const getCategoryList = async () => {
// // const allControllers = initModule.getAll(Service).map((c) => c.execute);
// // console.log("output_log: all =>>>", allControllers);
// //
// // allControllers.map((c) => console.log(c));
// // const categoryListService = initModule.get(Service);
// // return await categoryListService.execute();
// // };
