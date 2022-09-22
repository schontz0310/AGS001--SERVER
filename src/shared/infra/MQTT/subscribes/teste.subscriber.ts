export class TestSubscriber {
  public async run(payload: Buffer): Promise<void> {
    console.log({payload})
  }
}