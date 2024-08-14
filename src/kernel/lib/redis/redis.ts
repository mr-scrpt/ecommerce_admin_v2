// import Redis from "ioredis";
//
// const redis = new Redis();
//
// export function Cache(ttl: number = 300) {
//   return function (
//     target: any,
//     propertyName: string,
//     descriptor: TypedPropertyDescriptor<any>,
//   ) {
//     const originalMethod = descriptor.value;
//
//     descriptor.value = async function (...args: any[]) {
//       const cacheKey = `${propertyName}:${JSON.stringify(args)}`;
//
//       // Попытка получить данные из кэша Redis
//       const cachedResult = await redis.get(cacheKey);
//       if (cachedResult) {
//         return JSON.parse(cachedResult);
//       }
//
//       // Вызов оригинального метода и кэширование результата
//       const result = await originalMethod.apply(this, args);
//       await redis.set(cacheKey, JSON.stringify(result), "EX", ttl);
//
//       return result;
//     };
//
//     return descriptor;
//   };
// }
