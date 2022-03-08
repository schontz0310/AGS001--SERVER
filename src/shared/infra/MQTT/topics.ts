import { Console } from "console";
import { container } from "tsyringe";
import { TestSubscriber, ExampleSubscriber } from "./subscribes";

export enum MqttTopics {
  EXAMPLE = "example/", 
  TEST = "teste/",
  REGISTER = "register/"
}

export const MqttTopicsList: string[] = Object.entries(MqttTopics)
  .map(([_key, value]) => value);

export const MqttTopicsCallBacks: TopicsCallBacks = {
  [`${MqttTopics.TEST}`]: async (payload: Buffer) => {
    const testeSubscriber = container.resolve(TestSubscriber)
    await testeSubscriber.run(payload)
  },
  [`${MqttTopics.EXAMPLE}`]: async (payload: Buffer) => {
    const exSubscriber = container.resolve(ExampleSubscriber)
    await exSubscriber.run(payload)
  }
}

type TopicsCallBacks = {
  [key: string]: Function 
}