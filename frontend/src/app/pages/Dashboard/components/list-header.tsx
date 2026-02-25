import * as LucideIcons from "lucide-react"
import { Link } from "react-router-dom"

interface ListHeaderProps {
  title: string
  linkText: string
  linkTo: string
  icon: keyof typeof LucideIcons
}

export function ListHeader({ title, linkText, linkTo, icon }: ListHeaderProps) {
  const IconComponent = LucideIcons[icon] as React.ElementType

  return (
    <div className="flex items-center justify-between border-b pb-4 px-4">
      <span className="text-sm font-medium text-gray-500">{title}</span>
      <Link to={linkTo} className="flex items-center font-medium text-brand-base hover:underline">
        {linkText}
        <IconComponent className="w-4 h-4 ml-2" />
      </Link>
    </div>
  )
}