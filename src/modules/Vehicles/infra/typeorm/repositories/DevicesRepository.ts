import ICreateDeviceDTO from '@modules/Devices/dtos/ICreateDeviceDTO';
import IUpdateDeviceDTO from '@modules/Devices/dtos/IUpdateDeviceDTO';
import IDeviceRepository from '@modules/Devices/repositories/IDeviceRepository';
import { getRepository, Repository } from 'typeorm';
import Device from '../entities/Devices';

class DevicesRepository implements IDeviceRepository {
  private ormRepository: Repository<Device>;

  constructor() {
    this.ormRepository = getRepository(Device);
  }

  public async create(data: ICreateDeviceDTO): Promise<Device> {
    const device = this.ormRepository.create(data);
    await this.ormRepository.save(device);
    return device;
  }

  public async CheckExist(code: string): Promise<Device | undefined> {
    const device = await this.ormRepository.findOne({
      where: {
        code,
      },
    });
    return device;
  }

  public async findAllDevices(): Promise<Device[] | undefined> {
    const devices = await this.ormRepository.find();
    return devices;
  }

  public async deleteDevice(id: string): Promise<boolean> {
    const { affected } = await this.ormRepository.delete(id);
    if (affected < 1) {
      return false;
    }
    return true;
  }

  public async updateDevice(data: IUpdateDeviceDTO): Promise<Device> {
    const result = await this.ormRepository.save({
      id: data.deviceId,
      code: data.code,
      model: data.model,
      variant: data.variant,
      status: data.status,
      updated_at: new Date(),
    });
    return result;
  }
}

export default DevicesRepository;
