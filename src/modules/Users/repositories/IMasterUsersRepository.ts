import MasterUser from '@modules/Users/infra/typeorm/entities/UserMaster';
import ICreateMasterUserDTO from '../dtos/ICreateMasterUserDTO';

export default interface IMasterUsersRepository {
  create(data: ICreateMasterUserDTO): Promise<MasterUser>;
  save(user: MasterUser): Promise<MasterUser | null>;
  findById(id: string): Promise<MasterUser | null>;
  findByEmail(email: string): Promise<MasterUser | null>;
}
