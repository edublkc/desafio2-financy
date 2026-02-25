import { Option } from "./option"

export enum TransactionTypes {
  Input = "input",
  Output = "output"
}

interface TransactionTypeProps {
  selected: TransactionTypes
  onChange: (type: TransactionTypes) => void
}

export function TransactioType({ selected, onChange }: TransactionTypeProps) {
  return (
    <div className="flex border border-gray-200 rounded-xl items-center justify-between p-2 gap-2 mb-2">
      <Option
        icon="CircleArrowDownIcon"
        title="Despesa"
        isSelected={selected === TransactionTypes.Output}
        selectedColor="red-base"
        onClick={() => onChange(TransactionTypes.Output)}
      />
      <Option
        icon="CircleArrowUpIcon"
        title="Receita"
        isSelected={selected === TransactionTypes.Input}
        selectedColor="green-base"
        onClick={() => onChange(TransactionTypes.Input)}
      />
    </div>
  )
}