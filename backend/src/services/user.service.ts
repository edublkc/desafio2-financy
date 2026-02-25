import { prismaClient } from "../../prisma/prisma";
import { CreateUserInput, UpdateUserInput } from "../dtos/input/user.input";

export class UserService {

  async createUser(data: CreateUserInput) {
    const findUser = await prismaClient.user.findUnique({
      where: { email: data.email }
    })

    if (findUser) throw new Error("Email já cadastrado!")

    return prismaClient.user.create({
      data: {
        name: data.name,
        email: data.email
      }
    })
  }

  async findUserById(id: string) {
    const user = await prismaClient.user.findUnique({
      where: { id },
    })

    if (!user) throw new Error("Usuário não encontrado!")

    return user
  }

  async updateUser(id: string, data: UpdateUserInput) {
    const user = await prismaClient.user.findUnique({
      where: { id },
    })
    if (!user) throw new Error('Usuário não existe')

    return prismaClient.user.update({
      where: { id },
      data: { name: data.name ?? undefined }
    })
  }
}