import mqtt from 'mqtt';
import { inserirTemperatura } from '../database/temperaturaService';

const broker = 'mqtt://broker.hivemq.com:1883'; // ou seu broker MQTT local
const topico = 'sensor/temperatura';

export default function iniciarMQTT() {
  const client = mqtt.connect(broker);

  client.on('connect', () => {
    console.log('MQTT conectado');
    client.subscribe(topico);
  });

  client.on('message', (topic, message) => {
    try {
      const payload = JSON.parse(message.toString());
      if (topic === topico && payload.temperatura) {
        inserirTemperatura(payload.temperatura);
      }
    } catch (e) {
      console.error('Erro ao processar mensagem MQTT', e);
    }
  });
}
