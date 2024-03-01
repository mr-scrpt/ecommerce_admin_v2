type PropertyList = Record<string, string | string[]>;

const propertyToFlatList = (data: PropertyList) =>
  Object.entries(data.propertyList).flatMap(([_, value]) => {
    if (Array.isArray(value)) {
      return value.map((item) => ({ id: item }));
    }
    return { id: value };
  });
// const propertyItemListSelected = Object.entries(data.propertyList).flatMap(
//   ([_, value]) => {
//     if (Array.isArray(value)) {
//       return value.map((item) => ({ id: item }));
//     }
//     return { id: value };
//   },
// );
