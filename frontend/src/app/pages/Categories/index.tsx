import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { Page } from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Summary } from "./components/summary";
import { CreateCategoryDialog } from "./components/create-category.dialog";
import { Category } from "@/@types";
import { useMutation, useQuery } from "@apollo/client/react";
import { LIST_CATEGORIES_DASHBOARD } from "@/lib/graphql/queries/Category";
import { CategoryCard } from "./components/category-card";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { DELETE_CATEGORY } from "@/lib/graphql/mutations/Category";
import { LIST_TRANSACTIONS_DASHBOARD } from "@/lib/graphql/queries/Transaction";
import { ColorValues } from "@/@types/colors";

export function Categories() {
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined)
  const [openDialog, setOpenDialog] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);

  const { data } = useQuery<{ listCategories: Category[] }>(LIST_CATEGORIES_DASHBOARD)
  const categories = data?.listCategories || []

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setOpenDialog(true);
  }

  const handleDelete = (id: string) => {
    setConfirmDelete(true);
    setIdToDelete(id);
  }

  const [deleteCategoryMutation] = useMutation(DELETE_CATEGORY, {
    onCompleted: () => {
      setConfirmDelete(false);
    },
  })

  const deleteTransaction = async (id: string) => {
    if (!id) return;
    await deleteCategoryMutation({
      variables: { deleteCategoryId: id },
      refetchQueries: [
        { query: LIST_CATEGORIES_DASHBOARD },
        { query: LIST_TRANSACTIONS_DASHBOARD }
      ],
    });
  }

  const categoryMostUsed = () => {
    return categories?.reduce((prev, current) => (
      (prev.countTransactionByUser ?? 0) > (current.countTransactionByUser ?? 0) ? prev : current
    ), { title: " - - - ", iconName: "HelpCircleIcon", iconColor: "gray-500" } as Category);
  }

  return (
    <Page>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-800">Categorias</span>
            <span className="text-gray-600">Organize suas transações por categorias</span>
          </div>
          <Button
            type="button"
            onClick={() => setOpenDialog(true)}
            className="bg-brand-base text-sm font-medium text-white"
          >
            <PlusIcon size={24} className="text-gray-100" />
            Nova categoria
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6">
          <Summary
            label="TOTAL DE CATEGORIAS"
            value={categories.length.toString()}
            icon={{ name: "TagIcon", color: "gray-700" }}
          />
          <Summary
            label="TOTAL DE TRANSAÇÕES"
            value={
              categories?.reduce(
                (acc, category) => acc + (category?.countTransactionByUser ?? 0), 0
              ).toString()
            }
            icon={{ name: "ArrowUpDownIcon", color: "purple-base" }}
          />
          <Summary
            label="CATEGORIA MAIS UTILIZADA"
            value={categoryMostUsed()?.title}
            icon={{
              name: categoryMostUsed()?.iconName as keyof typeof import("lucide-react"),
              color: categoryMostUsed()?.iconColor as ColorValues
            }}
          />
        </div>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : null}

      </div>

      <CreateCategoryDialog
        open={openDialog}
        onOpenChange={(open) => {
          setOpenDialog(open)
          if (!open) setSelectedCategory(undefined)
        }}
        category={selectedCategory}
      />
      <DeleteConfirmation
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title="Remover Categoria"
        description="Tem certeza que deseja remover esta categoria? Esta ação não poderá ser desfeita."
        onConfirm={() => {
          if (idToDelete) {
            deleteTransaction(idToDelete);
          }
        }}
      />
    </Page>
  )
}