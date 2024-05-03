import { CommandItem } from "@/shared/ui/command";

const RenderItem = (props: CommandVirtualItem) => {
  const { item, key, value, label, onSelect, isSelected } = ({} = props);
  const { size, start } = item;
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
      key={key}
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
