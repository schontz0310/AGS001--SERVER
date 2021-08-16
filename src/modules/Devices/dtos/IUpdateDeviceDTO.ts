import ICreateDeviceDTO from './ICreateDeviceDTO';

export default interface IUpdateDeviceDTO extends ICreateDeviceDTO {
  deviceId: string;
}
