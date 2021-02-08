import IMasterUser from '@modules/users/infra/knex/entities/IMasterUser';
import ICreateMasterUserDTO from '../dtos/ICreateMasterUserDTO';

export default interface IMasterUsersRepository {
  create(data: ICreateMasterUserDTO): Promise<IMasterUser>;
  save(user: IMasterUser): Promise<IMasterUser | undefined>;
  findById(id: string): Promise<IMasterUser | undefined>;
  findByEmail(email: string): Promise<IMasterUser | undefined>;
}
