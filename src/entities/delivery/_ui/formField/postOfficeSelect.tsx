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
import { PostOfficeToSelect } from "../../_domain/postOffice.type";

interface PostOfficeSelectProps extends HTMLAttributes<HTMLDivElement> {
  control: UseFormReturn<any>["control"];
  postOfficeListToSelect: PostOfficeToSelect[];
}

interface VirtualizedSelectListProps {
  postOfficeListToSelect: PostOfficeToSelect[];
  onChange: (value: string) => void;
  value: string;
}

const VirtualizedSelectList = forwardRef<
  FixedSizeList,
  VirtualizedSelectListProps
>(({ postOfficeListToSelect, onChange, value }, ref) => {
  const Row = ({ index, style }: ListChildComponentProps) => {
    const postOffice = postOfficeListToSelect[index];

    const handleClick = () => {
      onChange(postOffice.value);
    };

    return (
      <SelectItem
        value={postOffice.value}
        key={postOffice.value}
        style={style}
        onClick={handleClick}
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
  console.log("output_log: work =>>>", control);

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
