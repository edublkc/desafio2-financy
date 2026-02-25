import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { TransactionModel } from "../models/transaction.model";
import { TransactionInput, UpdateTransactionInput } from "../dtos/input/transaction.input";
import { TransactionService } from "../services/transaction.service";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { User } from "@prisma/client";
import { CategoryModel } from "../models/category.model";
import { CategoryService } from "../services/category.service";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service";
import { IsAuth } from "../middlewares/auth.middleware";

@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {

  private transactionService = new TransactionService()
  private categoryService = new CategoryService()
  private userService = new UserService()

  @Mutation(() => TransactionModel)
  async createTransaction(
    @Arg("categoryId", () => String) categoryId: string,
    @Arg("data", () => TransactionInput) data: TransactionInput,
    @GqlUser() user: User
  ): Promise<TransactionModel> {
    return this.transactionService.createTransaction(categoryId, user.id, data)
  }

  @Mutation(() => TransactionModel)
  async updateTransaction(
    @Arg("data", () => UpdateTransactionInput) data: UpdateTransactionInput,
    @Arg("id", () => String) id: string
  ): Promise<TransactionModel> {
    return this.transactionService.updateTransaction(id, data)
  }

  @Mutation(() => Boolean)
  async deleteTransaction(
    @Arg("id", () => String) id: string
  ): Promise<boolean> {
    await this.transactionService.deleteTransaction(id)
    return true
  }

  @Query(() => [TransactionModel])
  async listTransactions(
    @GqlUser() user: User
  ): Promise<TransactionModel[]> {
    return this.transactionService.findTransactionsByUserId(user.id)
  }

  @FieldResolver(() => CategoryModel)
  async category(
    @Root() transaction: TransactionModel
  ): Promise<CategoryModel> {
    return this.categoryService.findCategoryById(transaction.categoryId)
  }

  @FieldResolver(() => UserModel)
  async user(
    @Root() transaction: TransactionModel
  ): Promise<UserModel> {
    return this.userService.findUserById(transaction.userId)
  }
}