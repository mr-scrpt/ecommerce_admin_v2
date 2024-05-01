import { FormControl, FormField, FormItem, FormLabel } from "@/shared/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { FC, HTMLAttributes, forwardRef, useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { FixedSizeList, ListChildComponentProps } from "react-window";

interface PostOfficeSelectProps extends HTMLAttributes<HTMLDivElement> {
  control: UseFormReturn<any>["control"];
  postOfficeListToSelect: PostOfficeToSelect[];
}

// export const PostOfficeSelect: FC<PostOfficeSelectProps> = (props) => {
//   const { control, postOfficeListToSelect } = props;
//   return (
//     <FormField
//       control={control}
//       name="postOffice"
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel>Post office</FormLabel>
//           <Select onValueChange={field.onChange} defaultValue={field.value}>
//             <FormControl>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select post office" />
//               </SelectTrigger>
//             </FormControl>
//             <SelectContent>
//               {postOfficeListToSelect &&
//                 postOfficeListToSelect.map((postOffice) => (
//                   <SelectItem value={postOffice.value} key={postOffice.value}>
//                     {postOffice.label}
//                   </SelectItem>
//                 ))}
//             </SelectContent>
//           </Select>
//         </FormItem>
//       )}
//     />
//   );
// };
// export const PostOfficeSelect: FC<PostOfficeSelectProps> = (props) => {
//   const { control, postOfficeListToSelect } = props;
//
//   // Функция для рендеринга каждого элемента списка
//   const renderRow = ({ index, style }) => {
//     const postOffice = postOfficeListToSelect[index];
//     return (
//       <SelectItem value={postOffice.value} key={postOffice.value} style={style}>
//         {postOffice.label}
//       </SelectItem>
//     );
//   };
//
//   return (
//     <FormField
//       control={control}
//       name="postOffice"
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel>Post office</FormLabel>
//           <Select onValueChange={field.onChange} defaultValue={field.value}>
//             <FormControl>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select post office" />
//               </SelectTrigger>
//             </FormControl>
//             <SelectContent>
//               <FixedSizeList
//                 width={"100%"}
//                 height={350} // Высота списка
//                 itemCount={postOfficeListToSelect.length} // Количество элементов
//                 itemSize={35} // Высота каждого элемента
//               >
//                 {renderRow}
//               </FixedSizeList>
//             </SelectContent>
//           </Select>
//         </FormItem>
//       )}
//     />
//   );
// };

interface PostOfficeToSelect {
  value: string;
  label: string;
}

interface PostOfficeSelectProps extends HTMLAttributes<HTMLDivElement> {
  control: UseFormReturn<any>["control"];
  postOfficeListToSelect: PostOfficeToSelect[];
}
// Определяем типы пропсов для VirtualizedSelectList
interface VirtualizedSelectListProps {
  postOfficeListToSelect: PostOfficeToSelect[];
  onChange: (value: string) => void;
  value: string;
}

// Создаем компонент VirtualizedSelectList с forwardRef
const VirtualizedSelectList = forwardRef<
  FixedSizeList,
  VirtualizedSelectListProps
>(({ postOfficeListToSelect, onChange, value }, ref) => {
  // Функция для рендеринга каждого элемента списка
  const Row = ({ index, style }: ListChildComponentProps) => {
    const postOffice = postOfficeListToSelect[index];
    // Обработчик клика для элемента списка, который вызывает onChange с правильным значением
    const handleClick = () => {
      onChange(postOffice.value);
    };
    return (
      <SelectItem
        value={postOffice.value}
        key={postOffice.value}
        style={style}
        onClick={handleClick} // Используем handleClick для обработки клика
      >
        {postOffice.label}
      </SelectItem>
    );
  };

  return (
    <FixedSizeList
      ref={ref}
      width={"100%"}
      height={350}
      itemCount={postOfficeListToSelect.length}
      itemSize={35}
      itemData={postOfficeListToSelect}
    >
      {Row}
    </FixedSizeList>
  );
});

VirtualizedSelectList.displayName = "VirtualizedSelectList";

export const PostOfficeSelect: FC<PostOfficeSelectProps> = ({
  control,
  postOfficeListToSelect,
}) => {
  const listRef = useRef(null);

  return (
    <FormField
      control={control}
      name="postOffice"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Post office</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select post office" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <VirtualizedSelectList
                ref={listRef} // Используем listRef для доступа к FixedSizeList
                postOfficeListToSelect={postOfficeListToSelect}
                onChange={field.onChange}
                value={field.value}
              />
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};
-name;
