import { cn } from "@/lib/utils";
import { bgColorMap, ColorValues } from "@/@types/colors";

interface ColorOptionProps {
  name: ColorValues,
  selected: boolean;
  onClick: () => void;
}

export function ColorOption({ name, selected, onClick }: ColorOptionProps) {
  const bgColorClass = bgColorMap[name]

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center justify-center border rounded-lg p-1 transition-all w-[50px] h-[30px]",
        selected
          ? "border-brand-base ring-1 ring-brand-base"
          : "border-gray-200"
      )}
    >
      <div className={cn(
        bgColorClass,
        "w-full h-full rounded-md shadow-sm"
      )} />
    </button>
  );
}