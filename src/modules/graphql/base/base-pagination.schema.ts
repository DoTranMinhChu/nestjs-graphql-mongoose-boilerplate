import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

@ObjectType()
export class PagingSchema {
  @Field(() => Int)
  limit!: number;

  @Field(() => Int)
  offset!: number;

  @Field(() => Int)
  page!: number;

  @Field(() => Int)
  total!: number;
}

export function PaginateDataSchema<T>(ItemType: Type<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class PageClass {
    @Field(() => [ItemType])
    data!: T[];

    @Field(() => Int)
    total!: number;

    @Field(() => PagingSchema)
    pagination!: PagingSchema;
  }

  return PageClass;
}

export class PaginateData<T> {
  data!: T[];

  total!: number;

  pagination!: PagingSchema;
}
