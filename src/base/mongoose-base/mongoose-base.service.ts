import { FlattenMaps, UpdateQuery } from 'mongoose';
import { MongooseBaseSchema } from './mongoose-base.schema';
import { MongooseBaseRepository } from './mongoose-base.repository';

export class MongooseBaseService<T extends MongooseBaseSchema> {
  constructor(private readonly repository: MongooseBaseRepository<T>) {}

  async create(createData: T | any): Promise<T> {
    return await this.repository.create(createData);
  }

  async findAll(
    filter?: object,
    options?: object,
  ): Promise<FindAllResponse<T | FlattenMaps<T>>> {
    return await this.repository.findAll(filter, options);
  }
  async findOne(id: string) {
    return await this.repository.findOneById(id);
  }

  async update(id: string, updateData: UpdateQuery<T>) {
    return await this.repository.updateById(id, updateData);
  }

  async remove(id: string) {
    return await this.repository.softDelete(id);
  }
}
