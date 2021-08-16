import ICreateDeviceDTO from '../dtos/ICreateDeviceDTO';
import IUpdateDeviceDTO from '../dtos/IUpdateDeviceDTO';
import Device from '../infra/typeorm/entities/Devices';

export default interface IDeviceRepository {
  create(data: ICreateDeviceDTO): Promise<Device>;
  CheckExist(code: string): Promise<Device | undefined>;
  findAllDevices(): Promise<Device[] | undefined>;
  deleteDevice(id: string): Promise<boolean>;
  updateDevice(data: IUpdateDeviceDTO): Promise<Device>;
}
