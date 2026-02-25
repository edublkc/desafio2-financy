import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";

interface IconOptionProps {
  name: keyof typeof LucideIcons,
  selected: boolean;
  onClick: () => void;
}

export function IconOption({ name, selected, onClick }: IconOptionProps) {
  const IconComponent = LucideIcons[name] as React.ElementType

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center justify-center border rounded-lg p-3 transition-all hover:bg-gray-50",
        selected
          ? "border-brand-base bg-brand-base/10 text-brand-base ring-1 ring-brand-base"
          : "border-gray-200 text-gray-600"
      )}
    >
      <IconComponent className="w-5 h-5" />
    </button>
  );
}