
import UserMaster from '@modules/Users/infra/typeorm/entities/UserMaster';
import IMasterUsersRepository from '../../../repositories/IMasterUsersRepository';
import ICreateMasterUserDTO from '../../../dtos/ICreateMasterUserDTO';
import { Repository } from 'typeorm';
import { AppDataSource } from '@shared/infra/database/typeorm/data-source';

class UsersMasterRepository implements IMasterUsersRepository {

  private ormRepository: Repository<UserMaster>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(UserMaster);
  }

  public async create({
    email,
    name,
    password
  }: ICreateMasterUserDTO): Promise<UserMaster> {
    const user = this.ormRepository.create({
      name: name,
      email: email,
      password: password,  
    });
    await this.ormRepository.save(user);

    return user;
  }

  public async findByEmail(email: string): Promise<UserMaster | null> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });
    return user;
  }

  public async findById(id: string): Promise<UserMaster | null> {
    const user = await this.ormRepository.findOne({
      where: { id },
    });
    return user;
  }

  public async save(user: UserMaster): Promise<UserMaster> {
    return this.ormRepository.save(user);
  }
}

export default UsersMasterRepository;