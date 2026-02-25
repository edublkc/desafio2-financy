
import { bgColorMap, ColorValues, textColorMap } from '@/@types/colors'
import * as LucideIcons from 'lucide-react'

interface TransactionItemProps {
  item: {
    id: string
    description: string
    amount: number
    date: string
    category: {
      title: string
      iconName?: keyof typeof LucideIcons
      iconColor?: ColorValues
    }
  }
}

export function TransactionItem({ item }: TransactionItemProps) {
  const CategoryIcon = LucideIcons[item.category.iconName ?? "Circle"] as React.ElementType
  const iconColorClass = textColorMap[item.category.iconColor ?? "gray-500"]
  const iconBgColorClass = bgColorMap[item.category.iconColor ?? "gray-500"]

  const formatDate = (date: string | Date) => {
    const aux = new Date(date)

    const formatter = Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    })

    return formatter.format(aux)
  }

  const formatCurrency = (amount: number) => {
    const formatter = Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    })

    return formatter.format(amount)
  }

  return (
    <div className='grid grid-cols-4 gap-8 border-b p-4 bg-white'>
      <div className='col-span-2 flex items-center gap-4'>
        <div className={`p-2 rounded-lg ${iconBgColorClass} bg-opacity-10 ${iconColorClass}`}>
          <CategoryIcon className='w-5 h-5' />
        </div>
        <div className='flex justify-center flex-col'>
          <span className='font-medium text-gray-800'>{item.description}</span>
          <span className='text-sm text-gray-600'>{formatDate(item.date)}</span>
        </div>
      </div>

      <div className='col-span-1 flex items-center justify-center'>
        <span className={`font-medium text-sm ${iconColorClass} ${iconBgColorClass} bg-opacity-10 px-4 py-1 rounded-2xl`}>
          {item.category.title}
        </span>
      </div>

      <div className='col-span-1 flex items-center justify-end'>
        <span className={`font-semibold text-sm`}>
          {formatCurrency(item.amount)}
        </span>
        {
          item.amount >= 0 ? (
            <LucideIcons.CircleArrowUpIcon className='w-5 h-5 text-brand-base ml-2' />
          ) : (
            <LucideIcons.CircleArrowDownIcon className='w-5 h-5 text-red-base ml-2' />
          )
        }
      </div>
    </div>
  )
}