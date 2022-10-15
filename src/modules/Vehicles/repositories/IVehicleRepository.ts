import ICreateDeviceDTO from "@modules/Devices/dtos/ICreateDeviceDTO";
import IUpdateDeviceDTO from "@modules/Devices/dtos/IUpdateDeviceDTO";
import Device from "@modules/Devices/infra/typeorm/entities/Devices";


export default interface IDeviceRepository {
  create(data: ICreateDeviceDTO): Promise<Device>;
  CheckExist(code: string): Promise<Device | null>;
  findAllDevices(): Promise<Device[] | []>;
  deleteDevice(id: string): Promise<boolean>;
  updateDevice(data: IUpdateDeviceDTO): Promise<Device>;
}
