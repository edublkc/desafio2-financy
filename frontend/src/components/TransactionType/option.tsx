import { borderColorMap, ColorValues, textColorMap } from "@/@types/colors"
import * as LucideIcons from "lucide-react"

interface OptionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isSelected: boolean
  title: string
  icon: keyof typeof LucideIcons
  selectedColor: ColorValues
}

export function Option({ isSelected, title, icon, selectedColor, ...rest }: OptionProps) {
  const IconComponent = LucideIcons[icon] as React.ElementType
  const iconColorClass = textColorMap[selectedColor]
  const borderColorClass = isSelected ? borderColorMap[selectedColor] : 'border-none'
  const titleColorClass = isSelected ? "text-gray-800" : "text-gray-600"

  return (
    <button
      type="button"
      className={`flex items-center justify-center w-full border rounded-md p-3 gap-6 ${borderColorClass}`}
      {...rest}
    >
      <IconComponent className={`w-4 h-4 ${isSelected ? iconColorClass : 'text-gray-600'}`} />
      <span className={`text-base font-medium ${titleColorClass}`}>{title}</span>
    </button>
  )
}