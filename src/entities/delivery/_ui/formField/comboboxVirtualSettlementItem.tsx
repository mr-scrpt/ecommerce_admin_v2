import { SettleToSelect } from "@/entities/settlement";
import { CommandItem } from "@/shared/ui/command";
import { cn } from "@/shared/ui/utils";
import { VirtualItem } from "@tanstack/react-virtual";
import { Check } from "lucide-react";
import { FC, HTMLAttributes } from "react";

interface CommandItem {
  value: string;
  label: string;
}

interface CommandVirtualSettlementItem<T extends CommandItem>
  extends HTMLAttributes<HTMLDivElement> {
  virtualData: VirtualItem;
  item: T;
  onSelect: () => void;
  isSelected: boolean;
}

export const ComboboxVirtualSettlementItem: FC<
  CommandVirtualSettlementItem<SettleToSelect>
> = (props) => {
  const { virtualData, item, onSelect, isSelected } = ({} = props);

  const { size, start } = virtualData;
  const { label, value } = item;

  return (
    <CommandItem
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: `${size}px`,
        transform: `translateY(${start}px)`,
      }}
      key={value}
      value={value}
      onSelect={onSelect}
    >
      <Check
        className={cn("mr-2 h-4 w-4", isSelected ? "opacity-100" : "opacity-0")}
      />
      {label}
    </CommandItem>
  );
};
