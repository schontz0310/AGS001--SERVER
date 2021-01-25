import IUser from '@modules/users/infra/knex/entities/IUser';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<IUser>;
  save(user: IUser): Promise<IUser | undefined>;
  findById(id: string): Promise<IUser | undefined>;
  findByEmail(email: string): Promise<IUser | undefined>;
  // findByCompany(company: string): Promise<IUser | undefined>;
}
