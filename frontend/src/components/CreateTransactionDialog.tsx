import React, { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"
import { Button } from "./ui/button"
import { TransactionTypes, TransactioType } from "./TransactionType"
import { useMutation, useQuery } from "@apollo/client/react"
import { CREATE_TRANSACTION, UPDATE_TRANSACTION } from "@/lib/graphql/mutations/Transaction"
import { toast } from "sonner"
import { LIST_TRANSACTIONS_DASHBOARD } from "@/lib/graphql/queries/Transaction"
import { Category, Transaction } from "@/@types"
import { LIST_CATEGORIES_DASHBOARD, LIST_CATEGORIES_TITLE } from "@/lib/graphql/queries/Category"

interface CreateTransactionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
  transaction?: Transaction
}

export function CreateTransactionDialog({ open, onOpenChange, transaction }: CreateTransactionDialogProps) {
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [amount, setAmount] = useState<number>()
  const [categoryId, setCategoryId] = useState<string>()
  const [type, setType] = useState<TransactionTypes>(TransactionTypes.Output)

  const { data } = useQuery<{ listCategories: Category[] }>(LIST_CATEGORIES_TITLE)
  const categories = data?.listCategories || []

  useEffect(() => {
    if (transaction && open) {
      setDescription(transaction.description)
      setDate(new Date(transaction.date).toISOString().split("T")[0])
      setAmount(Math.abs(transaction.amount))
      setType(transaction.amount < 0 ? TransactionTypes.Output : TransactionTypes.Input)
      setCategoryId(transaction.categoryId)
    } else if (!open) {
      setDescription("")
      setDate("")
      setAmount(undefined)
      setCategoryId(undefined)
      setType(TransactionTypes.Output)
    }
  }, [transaction, open])

  const [createTransaction, { loading: loadingCreate }] = useMutation(CREATE_TRANSACTION, {
    onCompleted(data, _) {
      if (data) {
        toast.success("Transação criada com sucesso")
        onOpenChange(false)
      }
    },
    onError() {
      toast.error("Falha ao criar a transação")
    },
    refetchQueries: [
      { query: LIST_TRANSACTIONS_DASHBOARD },
      { query: LIST_CATEGORIES_DASHBOARD }
    ],
  })

  const [updateTransaction, { loading: loadingUpdate }] = useMutation(UPDATE_TRANSACTION, {
    onCompleted(data, _) {
      if (data) {
        toast.success("Transação atualizada com sucesso")
        onOpenChange(false)
      }
    },
    onError() {
      toast.error("Falha ao atualizar a transação")
    },
    refetchQueries: [
      { query: LIST_TRANSACTIONS_DASHBOARD },
      { query: LIST_CATEGORIES_DASHBOARD }
    ],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      description,
      amount: type === TransactionTypes.Output
        ? (amount ?? 0) * -1
        : (amount ?? 0),
      date: new Date(date + "T00:00:00"),
    }

    if (transaction?.id) {
      updateTransaction({
        variables: {
          updateTransactionId: transaction.id,
          data: payload
        }
      })
      return
    }

    createTransaction({
      variables: {
        data: payload,
        categoryId: categoryId
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-base font-semibold text-gray-800">Nova Transação</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Registre sua despesa ou receita
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>

          <TransactioType selected={type} onChange={setType} />

          <Label htmlFor="description" className="text-sm text-gray-700 font-medium">Descrição</Label>
          <Input
            id="description"
            placeholder="Ex. Almoço no restaurante"
            value={description}
            onChange={e => setDescription(e.target.value)}
            disabled={loadingCreate || loadingUpdate}
          />

          <div className="flex items-center gap-4 py-4">
            <div className="flex flex-col w-full">
              <Label htmlFor="date" className="text-sm text-gray-700 font-medium">Data</Label>
              <Input
                id="date"
                type="date"
                placeholder="Selecione"
                value={date}
                onChange={e => setDate(e.target.value)}
                disabled={loadingCreate || loadingUpdate}
              />
            </div>
            <div className="flex flex-col w-full">
              <Label htmlFor="amount" className="text-sm text-gray-700 font-medium">Valor</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="RS 0,00"
                value={amount}
                onChange={e => setAmount(+e.target.value)}
                disabled={loadingCreate || loadingUpdate}
              />
            </div>

          </div>

          <Label htmlFor="category" className="text-sm text-gray-700 font-medium">Categoria</Label>
          <Select
            value={categoryId}
            onValueChange={e => setCategoryId(e)}
            disabled={loadingCreate || loadingUpdate || transaction?.id !== undefined}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categorias</SelectLabel>
                {
                  categories.map(category => (
                    <SelectItem value={category.id} key={category.id}>{category.title}</SelectItem>
                  ))
                }
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button
            type="submit"
            className="w-full bg-brand-base mt-4"
            disabled={loadingCreate || loadingUpdate}
          >Salvar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}