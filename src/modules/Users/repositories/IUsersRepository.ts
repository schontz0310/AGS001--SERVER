import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  findByEmailAndCompany(
    email: string,
    company_type_value: string,
  ): Promise<User | undefined>;
}
