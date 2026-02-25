import { User } from "@prisma/client";
import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { CreateCategoryInput, UpdateCategoryInput } from "../dtos/input/category.input";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { IsAuth } from "../middlewares/auth.middleware";
import { CategoryModel } from "../models/category.model";
import { UserModel } from "../models/user.model";
import { CategoryService } from "../services/category.service";
import { TransactionService } from "../services/transaction.service";
import { UserService } from "../services/user.service";

@Resolver(() => CategoryModel)
@UseMiddleware(IsAuth)
export class CategoryResolver {

  private categoryService = new CategoryService()
  private userService = new UserService()
  private transactionService = new TransactionService()

  @Mutation(() => CategoryModel)
  async createCategory(
    @Arg("data", () => CreateCategoryInput) data: CreateCategoryInput,
    @GqlUser() user: User
  ): Promise<CategoryModel> {
    return this.categoryService.createCategory(data, user.id)
  }

  @Mutation(() => CategoryModel)
  async updateCategory(
    @Arg("data", () => UpdateCategoryInput) data: UpdateCategoryInput,
    @Arg("id", () => String) id: string
  ): Promise<CategoryModel> {
    return this.categoryService.updateCategory(id, data)
  }

  @Mutation(() => Boolean)
  async deleteCategory(
    @Arg("id", () => String) id: string
  ): Promise<boolean> {
    await this.categoryService.deleteCategory(id)
    return true
  }

  @Query(() => [CategoryModel])
  async listCategories(): Promise<CategoryModel[]> {
    return this.categoryService.findAllCategories()
  }

  @FieldResolver(() => UserModel)
  async author(
    @Root() category: CategoryModel,
  ): Promise<UserModel> {
    return this.userService.findUserById(category.authorId)
  }

  @FieldResolver(() => Number)
  async countTransactionByUser(@Root() category: CategoryModel): Promise<number> {
    return this.transactionService.countTransactionByUser(category.id, category.authorId)
  }

  @FieldResolver(() => Number)
  async amount(@Root() category: CategoryModel): Promise<number> {
    return this.transactionService.amount(category.id, category.authorId)
  }
}