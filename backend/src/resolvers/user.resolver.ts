import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service";
import { IsAuth } from "../middlewares/auth.middleware";
import { CreateUserInput, UpdateUserInput } from "../dtos/input/user.input";


@Resolver(() => UserModel)
@UseMiddleware(IsAuth)
export class UserResolver {

  private userService = new UserService()

  @Query(() => UserModel)
  async getUser(
    @Arg("id", () => String) id: string
  ): Promise<UserModel> {
    return this.userService.findUserById(id)
  }

  @Mutation(() => UserModel)
  async createUser(
    @Arg("data", () => CreateUserInput) data: CreateUserInput
  ): Promise<UserModel> {
    return this.userService.createUser(data)
  }

  @Mutation(() => UserModel)
  async updateUser(
    @Arg('id', () => String) id: string,
    @Arg('data', () => UpdateUserInput) data: UpdateUserInput
  ): Promise<UserModel> {
    return this.userService.updateUser(id, data)
  }
}