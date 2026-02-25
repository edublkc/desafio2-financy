import { prismaClient } from "../../prisma/prisma";
import { CreateCategoryInput, UpdateCategoryInput } from "../dtos/input/category.input";

export class CategoryService {

  async createCategory(data: CreateCategoryInput, authorId: string) {
    return prismaClient.category.create({
      data: {
        title: data.title,
        description: data.description,
        iconName: data.iconName,
        iconColor: data.iconColor,
        authorId: authorId
      }
    })
  }

  async updateCategory(id: string, data: UpdateCategoryInput) {
    if (!id) throw new Error("Id da categoria é obrigatório.")

    const category = await prismaClient.category.findUnique({
      where: { id: id }
    })

    if (!category) throw new Error("Categoria não encontrada.")

    return prismaClient.category.update({
      where: { id: id },
      data: {
        title: data.title,
        description: data.description,
        iconName: data.iconName,
        iconColor: data.iconColor,
      }
    })
  }

  async findAllCategories() {
    return prismaClient.category.findMany()
  }

  async findCategoryById(id: string) {
    return prismaClient.category.findUnique({
      where: { id: id }
    })
  }

  async deleteCategory(id: string) {
    if (!id) throw new Error("Id da categoria é obrigatório.")

    const category = await prismaClient.category.findUnique({
      where: { id: id }
    })

    if (!category) throw new Error("Categoria não encontrada.")

    return await prismaClient.category.delete({
      where: { id: id }
    })
  }
}