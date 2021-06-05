import connection from '@shared/infra/database/knex/connection';
import IUsersRepository from '../../../repositories/IUsersRepository';
import ICreateUserDTO from '../../../dtos/ICreateUserDTO';
import User from '../../typeorm/entities/User';

class UsersRepository implements IUsersRepository {
  public async create({
    users_company,
    users_name,
    users_email,
    users_password,
  }: ICreateUserDTO): Promise<User> {
    const [user] = await connection('users')
      .insert({
        users_email,
        users_name,
        users_company,
        users_password,
      })
      .returning<User[]>('*');
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const [user] = await connection('users')
      .select('*')
      .where<User[]>('users_email', email);
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    console.log(id);
    return undefined;
  }

  public async save({
    company,
    name,
    email,
    password,
    id,
  }: User): Promise<User | undefined> {
    const user = await connection('users')
      .returning('*')
      .where({ user_id: id })
      .update({
        user_company: company,
        user_name: name,
        user_email: email,
        user_password: password,
        user_id: id,
      });
    console.log(user);
    return undefined;
  }
}

export default UsersRepository;
