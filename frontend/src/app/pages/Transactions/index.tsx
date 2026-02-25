import { useState } from "react";
import { PlusIcon } from "lucide-react"
import { useMutation, useQuery } from "@apollo/client/react";
import { Page } from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TransactionTypes } from "@/components/TransactionType";
import { CreateTransactionDialog } from "@/components/CreateTransactionDialog";
import { Category, Transaction } from "@/@types";
import { FieldFilter } from "./components/FieldFilter";
import TransactionDataTable from "./components/TransactionDataTable";
import { LIST_TRANSACTIONS_DASHBOARD } from "@/lib/graphql/queries/Transaction";
import { LIST_CATEGORIES_DASHBOARD } from "@/lib/graphql/queries/Category";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { DELETE_TRANSACTION } from "@/lib/graphql/mutations/Transaction";

export function Transactions() {
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | undefined>()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [idToDelete, setIdToDelete] = useState<string | null>(null)

  const { data: dataTransactions } = useQuery<{ listTransactions: Transaction[] }>(LIST_TRANSACTIONS_DASHBOARD);
  const { data: dataCategories } = useQuery<{ listCategories: Category[] }>(LIST_CATEGORIES_DASHBOARD)

  const transactions = dataTransactions?.listTransactions || []
  const categories = dataCategories?.listCategories || []

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setOpenDialog(true);
  };

  const handleDelete = async (id: string) => {
    setConfirmDelete(true);
    setIdToDelete(id);
  };

  const [deleteTransactionMutation] = useMutation(DELETE_TRANSACTION, {
    onCompleted: () => {
      setConfirmDelete(false);
    },
  })

  const deleteTransaction = async (id: string) => {
    if (!id) return;
    await deleteTransactionMutation({
      variables: { deleteTransactionId: id },
      refetchQueries: [{ query: LIST_TRANSACTIONS_DASHBOARD }],
    });
  }

  return (
    <Page>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-800">Transações</span>
            <span className="text-gray-600">Gerencie todas as suas transações financeiras</span>
          </div>
          <Button
            type="button"
            onClick={() => setOpenDialog(true)}
            className="bg-brand-base text-sm font-medium text-white"
          >
            <PlusIcon size={24} className="text-gray-100" />
            Nova transação
          </Button>
        </div>

        <TransactionDataTable
          data={transactions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        >
          {(table) => (
            <div className="flex items-center justify-between gap-4 bg-white border border-gray-200 rounded-xl px-6 py-5 mb-6">
              <FieldFilter label="Buscar">
                <Input
                  id="buscar"
                  type="text"
                  placeholder="Buscar por descrição"
                  value={(table.getColumn("description")?.getFilterValue() as string) ?? ""}
                  onChange={(event) =>
                    table.getColumn("description")?.setFilterValue(event.target.value)
                  }
                  iconName="SearchIcon"
                />
              </FieldFilter>
              <FieldFilter label="Tipo">
                <Select
                  onValueChange={(value) => {
                    table.getColumn("type")?.setFilterValue(value === "all" ? "" : value)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={TransactionTypes.Input}>Receita</SelectItem>
                    <SelectItem value={TransactionTypes.Output}>Despesa</SelectItem>
                  </SelectContent>
                </Select>
              </FieldFilter>
              <FieldFilter label="Categoria">
                <Select
                  onValueChange={(e) =>
                    table.getColumn("categoryTitle")?.setFilterValue(e === "all" ? "" : e)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      categories.map((category) => (
                        <SelectItem key={category.id} value={category.title}>
                          {category.title}
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </FieldFilter>
              <FieldFilter label="Período">
                <Input
                  id="date"
                  type="date"
                  placeholder="Selecione"
                  onChange={(e) => {
                    const val = e.target.value;
                    table.getColumn("date")?.setFilterValue(val || undefined);
                  }}
                />
              </FieldFilter>
            </div>
          )}
        </TransactionDataTable>
      </div>

      <CreateTransactionDialog
        open={openDialog}
        onOpenChange={(open) => {
          setOpenDialog(open)
          if (!open) setSelectedTransaction(undefined)
        }}
        transaction={selectedTransaction}
      />
      <DeleteConfirmation
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title="Remover Transação"
        description="Tem certeza que deseja remover esta transação? Esta ação não poderá ser desfeita."
        onConfirm={() => {
          if (idToDelete) {
            deleteTransaction(idToDelete);
          }
        }}
      />
    </Page>
  )
}