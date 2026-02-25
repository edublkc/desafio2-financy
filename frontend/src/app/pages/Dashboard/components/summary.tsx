import { textColorMap, ColorValues } from "@/@types/colors"
import * as LucideIcons from "lucide-react"

interface SummaryProps {
  label: string
  value: number
  icon: {
    name: keyof typeof LucideIcons
    color: ColorValues
  }
}

export function Summary({ label, value, icon }: SummaryProps) {
  const IconComponent = LucideIcons[icon.name] as React.ElementType
  const iconColorClass = textColorMap[icon.color]

  const formatCurrency = (amount: number) => {
    const formatter = Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    })

    return formatter.format(amount)
  }

  return (
    <div className="bg-white p-4 rounded-lg w-full border border-gray-200 gap-2 flex flex-col">
      <div className="flex items-center gap-3">
        <IconComponent className={`w-5 h-5 ${iconColorClass}`} />
        <span className="text-xs font-medium text-gray-500">{label}</span>
      </div>
      <span className="text-2xl font-bold text-gray-800">{formatCurrency(Number(value))}</span>
    </div>
  )
}