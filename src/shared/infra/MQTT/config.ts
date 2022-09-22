import { connectAsync, AsyncMqttClient, connect, AsyncClient } from 'async-mqtt';
import console from 'console';
import { MqttTopicsCallBacks, MqttTopicsList } from './topics';

export async function mqqtConect() {
  try {
    console.log('Starting');

    const client: AsyncMqttClient = await connectAsync('mqttServerAGS001', {
      port: 1883,
      username: 'admin',
      password: 'ags001#2020',
      protocol: 'mqtt',
      host: '3.143.105.105',
    });
    MqttTopicsList.map( async topic => {
      await client.subscribe(`${topic}`, {
        qos: 0,
      });
    })
    console.log(' ========================================================= ');
    console.log(' ===============  MQTT started on port 1883  ============= ');
    console.log(' ========================================================= ');
    client.on('message', function response(topic, message) {
      console.log({ topic });
      console.log({ message });
      try {
        MqttTopicsCallBacks[topic](message)
      } catch (error) {
        console.log('erro')
      }
    });
  } catch (e) {
    console.log(e);
    process.exit();
  }
}
