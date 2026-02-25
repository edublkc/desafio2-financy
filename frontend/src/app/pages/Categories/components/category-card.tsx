import * as LucideIcons from "lucide-react"
import { bgColorMap, ColorValues, textColorMap } from "@/@types/colors"
import { Category } from "@/@types"
import { Button } from "@/components/ui/button";

interface CategoryCardProps {
  category: Category,
  onEdit: (category: Category) => void;
  onDelete: (categoryId: string) => void;
}

export function CategoryCard({ category, onEdit, onDelete }: CategoryCardProps) {
  const IconComponent = (
    LucideIcons[category?.iconName as keyof typeof LucideIcons] ||
    LucideIcons.HelpCircleIcon
  ) as React.ElementType;

  const textColorClass = textColorMap[category?.iconColor as ColorValues ?? "gray-500"]
  const bgColorClass = bgColorMap[category?.iconColor as ColorValues ?? "gray-500"]


  return (
    <div className="flex flex-col justify-between p-6 gap-5 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center justify-between w-full">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-lg ${bgColorClass} ${textColorClass}`}
          style={{ backgroundColor: `color-mix(in srgb, currentColor, transparent 90%)` }}
        >
          <IconComponent className="w-5 h-5" />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="w-8 h-8 border border-gray-300 rounded-lg hover:bg-gray-200"
            onClick={() => onDelete(category.id)}
          >
            <LucideIcons.TrashIcon className="w-4 h-4 text-danger" />
          </Button>
          <Button
            variant="ghost"
            className="w-8 h-8 border border-gray-200 rounded-lg hover:bg-gray-200"
            onClick={() => onEdit(category)}
          >
            <LucideIcons.SquarePenIcon className="w-4 h-4 text-gray-700" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="font-semibold text-gray-800">{category?.title}</span>
        <span className="text-sm text-gray-600">{category?.description}</span>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className={`py-1 px-2 text-sm font-medium ${textColorClass} ${bgColorClass} bg-opacity-10 rounded-xl`}>
          {category?.title}
        </div>
        <div className="text-sm font-medium text-gray-700">
          {(category?.countTransactionByUser ?? 0)} {(category?.countTransactionByUser ?? 0) <= 1 ? 'item' : 'itens'}
        </div>
      </div>
    </div>
  )
}