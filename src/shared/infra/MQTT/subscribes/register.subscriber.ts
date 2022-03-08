import { container } from "tsyringe"

export class RegisterSubscriber {
  public async run(payload: Buffer): Promise<void> {
    const registerDeviceService = container.resolve()
    console.log('registerSub', payload)

  }
}