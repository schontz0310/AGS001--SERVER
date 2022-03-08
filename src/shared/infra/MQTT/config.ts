import { connectAsync, AsyncMqttClient, connect, AsyncClient } from 'async-mqtt';
import console from 'console';
import { MqttTopics, MqttTopicsCallBacks, MqttTopicsList } from './topics';

export async function mqqtConect() {
  try {
    console.log('Starting');

    const client: AsyncMqttClient = await connectAsync('mqttServerAGS001', {
      port: 1883,
      username: 'supply-admin',
      password: 'supply@19!',
      protocol: 'mqtt',
      host: 'mqtt.datamills.com.br',
    });
    MqttTopicsList.map( async topic => {
      await client.subscribe(`${topic}`, {
        qos: 2,
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
