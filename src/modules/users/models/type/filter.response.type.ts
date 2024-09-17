import { UserEntity } from '../entity/user.entity';

export type FilterResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type TransformedUserEntity = Omit<UserEntity, 'skills'> & {
  skills: string[];
};
