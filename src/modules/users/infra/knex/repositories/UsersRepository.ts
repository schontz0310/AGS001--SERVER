import connection from '@shared/infra/database/knex/connection';
import IUser from '@modules/users/infra/knex/entities/IUser';
import IUsersRepository from '../../../repositories/IUsersRepository';
import ICreateUserDTO from '../../../dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
  public async create({
    users_company,
    users_name,
    users_email,
    users_password,
  }: ICreateUserDTO): Promise<IUser> {
    const [user] = await connection('users')
      .insert({
        users_email,
        users_name,
        users_company,
        users_password,
      })
      .returning<IUser[]>('*');
    return user;
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    const [user] = await connection('users')
      .select('*')
      .where<IUser[]>('users_email', email);
    return user;
  }

  public async findById(id: string): Promise<IUser | undefined> {
    console.log(id);
    return undefined;
  }

  public async save({
    users_company,
    users_name,
    users_email,
    users_password,
    users_id,
  }: IUser): Promise<IUser | undefined> {
    const user = await connection('users')
      .returning('*')
      .where({ users_id })
      .update({
        users_company,
        users_name,
        users_email,
        users_password,
        users_id,
      });
    console.log(user);
    return undefined;
  }
}

export default UsersRepository;
