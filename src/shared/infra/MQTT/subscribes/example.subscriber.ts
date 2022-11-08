export class ExampleSubscriber {
  public async run(payload: Buffer): Promise<void> {
    console.log('exampleSub', payload)
  }
}