import { QueryBuilder } from 'knex';
import { User } from '../types/index';
import db from '../database/db-config';

interface UserFilter {
  username?: string | string[];
}

const find = (): QueryBuilder<{}, User[]> => {
  return db('users').select('id', 'username', 'password');
};

const findBy = (filter: UserFilter): QueryBuilder<{}, User> => {
  return db('users')
    .where(filter)
    .first<User>();
};

const findById = (id: number): QueryBuilder<{}, User> => {
  return db('users')
    .where({ id })
    .first<User>();
};

const add = async (user: User): Promise<User> => {
  const ids = await db('users').insert(user, 'id');
  const [id] = ids;
  return findById(id);
};

export default {
  add,
  find,
  findBy,
  findById,
};
