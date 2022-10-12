import { FuelType, OperatorLevel } from "../infra/typeorm/entities/types";

export default interface ICreateAppointmentDTO {
  code: string;
  date: string;
  hour: string;
  device: string;
  company: string;
  operatorTag: string;
  operatorName: string;
  operatorLevel: string;
  vehicleTag: string;
  vehicleName: string;
  fuelType: string;
  vehicleOdometer: number;
  fuelQuantity: number;
}
