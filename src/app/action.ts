// "use client";

import {
  categoryService,
  categoryListService,
} from "@/entities/category/instanse";

export const serviceExecutors = {
  getCategoryList: async () => await categoryListService(),
  getCategory: async (props) => await categoryService(props),
};
//
// export const serviceExecutors = {
//   ...categoryService(),
// };

// import { Service } from "./initAction";
// import { initModule } from "./module";
//
// export const serviceList = async () => {
//   const serviceList = initModule.getAll(Service);
//   return serviceList.map((c) => c.execute());
// };
// // const serviceExecutors: Record<string, (...args: any[]) => Promise<any>> = {};
// //
// // serviceList().then((serviceList) =>
// //   serviceList.forEach((serviceInstance, index) => {
// //     const serviceName = serviceInstance.constructor.name;
// //     serviceExecutors[serviceName] =
// //       serviceInstance.execute.bind(serviceInstance);
// //   }),
// // );
//
// // export const getService = async () => {
// //   return serviceExecutors;
// // };
//
// export const getCategoryList = async () => {
//   // const allControllers = initModule.getAll(Service).map((c) => c.execute);
//   // console.log("output_log: all =>>>", allControllers);
//   //
//   // allControllers.map((c) => console.log(c));
//   const categoryListService = initModule.get(Service);
//   return await categoryListService.execute();
// };
