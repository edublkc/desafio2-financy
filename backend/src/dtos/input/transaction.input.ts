import { Field, InputType } from "type-graphql";

@InputType()
export class TransactionInput {

  @Field(() => String)
  description!: string

  @Field(() => Number)
  amount!: number

  @Field(() => Date)
  date!: Date
}

@InputType()
export class UpdateTransactionInput {

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => Number, { nullable: true })
  amount?: number

  @Field(() => Date, { nullable: true })
  date?: Date
}