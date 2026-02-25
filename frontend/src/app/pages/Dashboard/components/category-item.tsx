
import { bgColorMap, ColorValues, textColorMap } from '@/@types/colors'

interface CategoryItemProps {
  item: {
    id: string
    title: string
    iconColor?: ColorValues
    countTransactionByUser: number
    amount: number
  }
}

export function CategoryItem({ item }: CategoryItemProps) {
  const iconColorClass = textColorMap[item.iconColor ?? "gray-500"]
  const iconBgColorClass = bgColorMap[item.iconColor ?? "gray-500"]

  const formatCurrency = (amount: number) => {
    const formatter = Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    })

    return formatter.format(amount)
  }

  return (
    <div className='grid grid-cols-4 gap-4 px-4 mt-4 bg-white'>
      <div className='col-span-2 flex items-center justify-start gap-4'>
        <span className={`font-medium text-sm ${iconColorClass} ${iconBgColorClass} bg-opacity-10 px-4 py-1 rounded-2xl`}>
          {item.title}
        </span>
      </div>

      <div className='col-span-1 flex items-center justify-end'>
        <span className={`text-sm text-gray-600`}>
          {item.countTransactionByUser} {item.countTransactionByUser <= 1 ? 'item' : 'itens'}
        </span>
      </div>

      <div className='col-span-1 flex items-center justify-end'>
        <span className={`font-semibold text-sm text-gray-800`}>{formatCurrency(item.amount)}</span>
      </div>
    </div>
  )
}