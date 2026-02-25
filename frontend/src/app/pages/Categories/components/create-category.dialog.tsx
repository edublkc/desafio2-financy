import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Category } from "@/@types"
import React, { useEffect, useState } from "react"
import { IconOption } from "./icon-option"
import { ColorOption } from "./color-option"
import { ColorValues } from "@/@types/colors"
import { useMutation } from "@apollo/client/react"
import { CREATE_CATEGORY, UPDATE_CATEGORY } from "@/lib/graphql/mutations/Category"
import { toast } from "sonner"
import { LIST_CATEGORIES_DASHBOARD } from "@/lib/graphql/queries/Category"

interface CreateCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
  category?: Category
}

const ICON_LIST = [
  "BriefcaseBusinessIcon", "CarFrontIcon", "HeartPulseIcon", "PiggyBankIcon",
  "ShoppingCartIcon", "TicketIcon", "ToolCaseIcon", "UtensilsIcon",
  "PawPrintIcon", "HouseIcon", "GiftIcon", "DumbbellIcon",
  "BookOpenIcon", "BaggageClaimIcon", "MailboxIcon", "ReceiptTextIcon",
];

const COLOR_LIST = [
  "green-base", "blue-base", "purple-base", "pink-base",
  "red-base", "orange-base", "yellow-base"
];

export function CreateCategoryDialog({ open, onOpenChange, category }: CreateCategoryDialogProps) {
  const [title, setTitle] = useState<string>(category ? category.title : '')
  const [description, setDescription] = useState(category ? category.description : '')
  const [selectedIcon, setSelectedIcon] = useState(category?.iconName || '')
  const [selectedColor, setSelectedColor] = useState(category?.iconColor || 'gray-500')

  useEffect(() => {
    if (category && open) {
      setTitle(category.title)
      setDescription(category.description)
      setSelectedIcon(category?.iconName ?? '')
      setSelectedColor(category?.iconColor ?? '')
    } else if (!open) {
      setTitle('')
      setDescription('')
      setSelectedIcon('')
      setSelectedColor('gray-500')
    }
  }, [category, open])

  const [createCategory, { loading: loadingCreate }] = useMutation(CREATE_CATEGORY, {
    onCompleted(data, _) {
      if (data) {
        toast.success("Categoria criada com sucesso")
        onOpenChange(false)
      }
    },
    onError() {
      toast.error("Falha ao criar a categoria")
    },
    refetchQueries: [{ query: LIST_CATEGORIES_DASHBOARD }],
  })

  const [updateCategory, { loading: loadingUpdate }] = useMutation(UPDATE_CATEGORY, {
    onCompleted(data, _) {
      if (data) {
        toast.success("Categoria atualizada com sucesso")
        onOpenChange(false)
      }
    },
    onError() {
      toast.error("Falha ao atualizar a categoria")
    },
    refetchQueries: [{ query: LIST_CATEGORIES_DASHBOARD }],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const payload = { title, description, iconName: selectedIcon, iconColor: selectedColor };

    if (category?.id) {
      updateCategory({
        variables: {
          updateCategoryId: category.id,
          data: payload
        }
      })
      return
    }

    createCategory({
      variables: {
        data: payload
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-base font-semibold text-gray-800">Nova categoria</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Organize suas transações com categorias
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>

          <Label htmlFor="title" className="text-sm text-gray-700 font-medium">Título</Label>
          <Input
            id="title"
            placeholder="Ex. Alimentação"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="flex items-center gap-4 py-4">
            <div className="flex flex-col w-full">
              <Label htmlFor="description" className="text-sm text-gray-700 font-medium">Data</Label>
              <Input
                id="description"
                type="description"
                placeholder="Descrição da categoria"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Label htmlFor="optional" className="text-xs text-gray-500 mt-1">Opcional</Label>
            </div>
          </div>

          <Label htmlFor="icon" className="text-sm text-gray-700 font-medium">Ícone</Label>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mt-2 max-h-[200px] overflow-y-auto p-1">
            {ICON_LIST.map((iconName) => (
              <IconOption
                key={iconName}
                name={iconName as keyof typeof import("lucide-react")}
                selected={selectedIcon === iconName}
                onClick={() => setSelectedIcon(iconName)}
              />
            ))}
          </div>

          <Label htmlFor="icon" className="text-sm text-gray-700 font-medium">Cor</Label>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mt-2 max-h-[200px] overflow-y-auto p-1">
            {COLOR_LIST.map((colorName) => (
              <ColorOption
                key={colorName}
                name={colorName as ColorValues}
                selected={selectedColor === colorName}
                onClick={() => setSelectedColor(colorName)}
              />
            ))}
          </div>

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