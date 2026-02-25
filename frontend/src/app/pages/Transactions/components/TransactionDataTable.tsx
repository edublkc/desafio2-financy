"use client"

import * as LucideIcons from "lucide-react"

import { DataTable } from "@/components/DataTable"
import { TransactionTypes } from "@/components/TransactionType"
import { Button } from "@/components/ui/button"
import { Transaction } from "@/@types"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDownIcon } from "lucide-react"
import { bgColorMap, ColorValues, textColorMap } from "@/@types/colors"


const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Descrição
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const { category, description } = row.original;

      const IconComponent = (
        LucideIcons[category?.iconName as keyof typeof LucideIcons] ||
        LucideIcons.HelpCircleIcon
      ) as React.ElementType;
      const iconColorClass = textColorMap[category?.iconColor as ColorValues ?? "gray-500"]
      const iconBgColorClass = bgColorMap[category?.iconColor as ColorValues ?? "gray-500"]

      return (
        <div className="flex items-center px-6 py-2 gap-3">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-lg ${iconBgColorClass} ${iconColorClass}`}
            style={{ backgroundColor: `color-mix(in srgb, currentColor, transparent 90%)` }}
          >
            <IconComponent className="w-5 h-5" />
          </div>

          <span className="font-medium text-base text-gray-800">
            {description}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: "date",
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true;

      const rawValue = row.getValue(columnId) as number;
      if (!rawValue) return false;

      const date = new Date(rawValue);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      const rowDateString = `${year}-${month}-${day}`;

      return rowDateString === filterValue;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const timestamp = row.getValue("date") as number;
      return <div className="flex items-center text-sm text-gray-600">
        {new Date(timestamp).toLocaleDateString("pt-BR")}
      </div>;
    }
  },
  {
    accessorKey: "category.title",
    id: "categoryTitle",
    filterFn: "equals",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Categoria
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const { category } = row.original;

      const textColorClass = textColorMap[category?.iconColor as ColorValues ?? "gray-500"]
      const bgColorClass = bgColorMap[category?.iconColor as ColorValues ?? "gray-500"]

      return <div className="flex items-center justify-center">
        <div className={`py-1 px-2 text-sm font-medium ${textColorClass} ${bgColorClass} bg-opacity-10 rounded-xl`}>
          {row.getValue("categoryTitle")}
        </div>
      </div>
    }
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tipo
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    filterFn: (row, _, filterValue) => {
      if (!filterValue || filterValue === "all") return true;

      const amount = row.original.amount;
      const type = amount >= 0 ? TransactionTypes.Input : TransactionTypes.Output;

      return type === filterValue;
    },
    cell: ({ row }) => {
      const type = row.original.amount >= 0
        ? TransactionTypes.Input
        : TransactionTypes.Output;
      const IconComponent = type === TransactionTypes.Input
        ? LucideIcons.CircleArrowUpIcon
        : LucideIcons.CircleArrowDownIcon;
      const textColorClass = type === TransactionTypes.Input
        ? textColorMap["green-dark"]
        : textColorMap["red-dark"];
      const label = type === TransactionTypes.Input ? "Entrada" : "Saída";

      return <div className="flex items-center justify-center gap-2">
        <IconComponent className={`w-4 h-4 ${textColorClass}`} />
        <span className={`text-sm font-medium ${textColorClass}`}>{label}</span>
      </div>
    }
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Valor
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number
      return <div className="text-sm font-semibold text-gray-800">
        {amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
      </div>
    }
  }
]

interface TransactionDataTableProps {
  data: Transaction[],
  children?: (table: any) => React.ReactNode,
  onEdit?: (transaction: Transaction) => void,
  onDelete?: (transactionId: string) => void,
}

export default function TransactionDataTable({
  data,
  children,
  onEdit,
  onDelete,
}: TransactionDataTableProps) {

  const columnsWithActions: ColumnDef<Transaction>[] = [
    ...columns,
    {
      id: "actions",
      header: () => <div className="text-center">Ações</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="ghost"
            onClick={() => onDelete?.(row.original.id)}
            className="w-8 h-8 border border-gray-300 rounded-lg hover:bg-gray-200"
          >
            <LucideIcons.TrashIcon className="w-4 h-4 text-danger" />
          </Button>
          <Button
            variant="ghost"
            onClick={() => onEdit?.(row.original)}
            className="w-8 h-8 border border-gray-200 rounded-lg hover:bg-gray-200"
          >
            <LucideIcons.SquarePenIcon className="w-4 h-4 text-gray-700" />
          </Button>
        </div>
      )
    }
  ];

  const color = textColorMap;
  const bgColor = bgColorMap;

  return (
    <DataTable columns={columnsWithActions} data={data} pageSize={15}>
      {(table) => (children ? children(table) : null)}
    </DataTable>
  )
}