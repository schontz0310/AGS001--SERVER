import connection from '@shared/infra/database/knex/connection';
import IMasterUser from '@modules/Users/infra/knex/entities/IMasterUser';
import IMasterUsersRepository from '../../../repositories/IMasterUsersRepository';
import ICreateMasterUserDTO from '../../../dtos/ICreateMasterUserDTO';

class UsersRepository implements IMasterUsersRepository {
  public async create({
    admin_users_name,
    admin_users_email,
    admin_users_password,
  }: ICreateMasterUserDTO): Promise<IMasterUser> {
    const [user] = await connection('admin_users')
      .insert({
        admin_users_email,
        admin_users_name,
        admin_users_password,
      })
      .returning<IMasterUser[]>('*');
    return user;
  }

  public async findByEmail(email: string): Promise<IMasterUser | undefined> {
    const [user] = await connection('admin_users')
      .select('*')
      .where<IMasterUser[]>('admin_users_email', email);
    return user;
  }

  public async findById(id: string): Promise<IMasterUser | undefined> {
    console.log(id);
    return undefined;
  }

  public async save({
    admin_users_name,
    admin_users_email,
    admin_users_password,
    admin_users_id,
  }: IMasterUser): Promise<IMasterUser | undefined> {
    const user = await connection('users')
      .returning('*')
      .where({ admin_users_id })
      .update({
        admin_users_name,
        admin_users_email,
        admin_users_password,
        admin_users_id,
      });
    console.log(user);
    return undefined;
  }
}

export default UsersRepository;
