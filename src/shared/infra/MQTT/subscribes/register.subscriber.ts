
import ICompaniesRepository from '@modules/Companies/repositories/ICompaniesRepository';
import IDevicesRepository from '@modules/Devices/repositories/IDeviceRepository';
import {AssignDeviceInCompanyService} from '@modules/Companies/service/AssignDeviceInCompanyService';
import { container, inject, injectable } from 'tsyringe';
import IAssignDeviceDTO from '@modules/Devices/dtos/IAssignDeviceDTO';
import AppError from '@shared/errors/AppError';
import ICreateAppointmentDTO from '@modules/Appointment/dtos/ICreateAppointmentDTO';
import { CreateAppointmentService } from '@modules/Appointment/service/CreateAppointmentService';

type NumberKey = {
  [index: number]: () => void;
}

export class RegisterSubscriber {
  constructor(
  ) {}
  public async run(payload: Buffer): Promise<void> {
   console.log({payload})
   const code = Number(JSON.parse(payload.toString()).c)
   console.log({code})
   this.getCode(payload, code)    
  }

  private async assignDevice(payload: Buffer) {
    try {
     
      const companyId = "";
      const deviceId = "";
      const assignDeviceParams:IAssignDeviceDTO = {
       companyId,
       deviceId
      }  
      const assignDevice = container.resolve(AssignDeviceInCompanyService)
      await assignDevice.execute(assignDeviceParams)
      } catch (error) {
        console.log({error})
      }
  }


  private async fuelCharger(payload: Buffer) {
    try {
      const date = JSON.parse(payload.toString()).d as string
      const createAppointmentParams:ICreateAppointmentDTO = {
        date: date,
        hour: JSON.parse(payload.toString()).h,
        device: JSON.parse(payload.toString()).e,
        code: JSON.parse(payload.toString()).c,
        operatorTag:JSON.parse(payload.toString()).ot,
        operatorName: JSON.parse(payload.toString()).on,
        operatorLevel: JSON.parse(payload.toString()).ol,
        vehicleTag: JSON.parse(payload.toString()).vt,
        vehicleName: JSON.parse(payload.toString()).vn,
        fuelType: JSON.parse(payload.toString()).vf ,
        vehicleOdometer: Number(JSON.parse(payload.toString()).vo) ?? 0,
        fuelQuantity: Number(JSON.parse(payload.toString()).fq),
        company: JSON.parse(payload.toString()).cy,
      }  
      
      const createAppointment = container.resolve(CreateAppointmentService)
      await createAppointment.execute(createAppointmentParams)
      } catch (error) {
        console.log({error})
      }
  }


  private getCode(payload: Buffer, code: number):  void {

    var codes: NumberKey = {
      80 :  async () => {
        await this.assignDevice(payload)
      },
      99 :  async () => {
        await this.fuelCharger(payload)
      }

    };
    console.log('object literal', codes[code])

    if (codes[code] === undefined) {
      console.log("ERRO")
    } else {
      codes[code]()
    }


  }
}

