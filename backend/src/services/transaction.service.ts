import { prismaClient } from "../../prisma/prisma";
import { TransactionInput, UpdateTransactionInput } from "../dtos/input/transaction.input";
import { TransactionModel } from "../models/transaction.model";

export class TransactionService {

  async createTransaction(
    categoryId: string, userId: string, data: TransactionInput
  ): Promise<TransactionModel> {
    const findCategory = await prismaClient.category.findUnique({
      where: { id: categoryId }
    })

    if (!findCategory) throw new Error("Categoria não encontrada.")

    return await prismaClient.transaction.create({
      data: {
        description: data.description,
        amount: data.amount,
        date: data.date,
        categoryId: categoryId,
        userId: userId
      }
    })
  }

  async findTransactionsByUserId(userId: string): Promise<TransactionModel[]> {
    return await prismaClient.transaction.findMany({
      where: { userId: userId },
      orderBy: { createdAt: "desc" }
    })
  }

  async updateTransaction(id: string, data: UpdateTransactionInput) {
    if (!id) throw new Error("Id da transação é obrigatório.")

    const transaction = await prismaClient.transaction.findUnique({
      where: { id: id }
    })

    if (!transaction) throw new Error("Transação não encontrada.")

    return await prismaClient.transaction.update({
      where: { id },
      data: {
        description: data.description,
        amount: data.amount,
        date: data.date
      }
    })
  }

  async deleteTransaction(id: string) {
    if (!id) throw new Error("Id da transação é obrigatório.")

    const transaction = await prismaClient.transaction.findUnique({
      where: { id: id }
    })

    if (!transaction) throw new Error("Transação não encontrada.")

    return await prismaClient.transaction.delete({
      where: { id: id }
    })
  }

  async countTransactionByUser(categoryId: string, userId: string) {
    return prismaClient.transaction.count({
      where: {
        categoryId: categoryId,
        userId: userId
      }
    })
  }

  async amount(categoryId: string, userId: string) {
    return (await prismaClient.transaction.aggregate({
      _sum: {
        amount: true
      },
      where: {
        categoryId: categoryId,
        userId: userId
      }
    }))._sum.amount
  }
}