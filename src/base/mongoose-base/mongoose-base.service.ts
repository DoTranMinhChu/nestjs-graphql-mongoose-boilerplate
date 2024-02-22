import {
  FilterQuery,
  FlattenMaps,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import { MongooseBaseSchema } from './mongoose-base.schema';
import { MongooseBaseRepository } from './mongoose-base.repository';
import { QueryGetListInput } from '@modules/graphql/base/base-input.schema';
import { NotFoundException } from '@exceptions/not-found.exception';
import { EXCEPTION } from '@exceptions/exception';

export class MongooseBaseService<T extends MongooseBaseSchema> {
  constructor(private readonly repository: MongooseBaseRepository<T>) {}
  async fetch(query: QueryGetListInput) {
    return await this.repository.fetch(query);
  }
  async create(createData: T | any): Promise<T> {
    return await this.repository.create(createData);
  }

  async findAll(
    filter?: object,
    options?: object,
  ): Promise<FindAllResponse<T | FlattenMaps<T>>> {
    return await this.repository.findAll(filter, options);
  }
  async findOne(
    filter?: FilterQuery<T>,
    projection?: ProjectionType<T> | null | undefined,
    options?: QueryOptions<T> | null | undefined,
    nullable = false,
  ) {
    const result = await this.repository.findOneByCondition(
      filter,
      projection,
      options,
    );
    if (!nullable && !result) {
      throw new NotFoundException(EXCEPTION.RECORD_NOT_FOUND);
    }
    return result;
  }
  async findOneById(id: string, nullable = false) {
    const result = await this.repository.findOneById(id);
    if (!nullable && !result) {
      throw new NotFoundException(EXCEPTION.RECORD_NOT_FOUND);
    }
    return result;
  }

  async update(id: string, updateData: UpdateQuery<T>) {
    return await this.repository.updateById(id, updateData);
  }

  async remove(id: string) {
    return await this.repository.softDelete(id);
  }
}
