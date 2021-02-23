import connection from '@shared/infra/database/knex/connection';
import IMasterUser from '@modules/users/infra/knex/entities/IMasterUser';
import IMasterUsersRepository from '../../../repositories/IMasterUsersRepository';
import ICreateMasterUserDTO from '../../../dtos/ICreateMasterUserDTO';

class UsersRepository implements IMasterUsersRepository {
  public async create({
    users_name,
    users_email,
    users_password,
  }: ICreateMasterUserDTO): Promise<IMasterUser> {
    const [user] = await connection('users')
      .insert({
        users_email,
        users_name,
        users_password,
      })
      .returning<IMasterUser[]>('*');
    return user;
  }

  public async findByEmail(email: string): Promise<IMasterUser | undefined> {
    const [user] = await connection('admin_users')
      .select('*')
      .where<IMasterUser[]>('users_email', email);
    console.log(user);
    return user;
  }

  public async findById(id: string): Promise<IMasterUser | undefined> {
    console.log(id);
    return undefined;
  }

  public async save({
    users_name,
    users_email,
    users_password,
    users_id,
  }: IMasterUser): Promise<IMasterUser | undefined> {
    const user = await connection('users')
      .returning('*')
      .where({ users_id })
      .update({
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
