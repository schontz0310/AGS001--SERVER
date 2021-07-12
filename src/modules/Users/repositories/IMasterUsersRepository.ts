import MasterUser from '@modules/Users/infra/typeorm/entities/UserMaster';
import ICreateMasterUserDTO from '../dtos/ICreateMasterUserDTO';

export default interface IMasterUsersRepository {
  create(data: ICreateMasterUserDTO): Promise<MasterUser>;
  save(user: MasterUser): Promise<MasterUser | undefined>;
  findById(id: string): Promise<MasterUser | undefined>;
  findByEmail(email: string): Promise<MasterUser | undefined>;
}
