import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { createTables } from './database/database';
import GraficoTemperatura from './components/graficoTemperatura';
import iniciarMQTT from './mqtt/mqttService';

export default function teste() {
  useEffect(() => {
    createTables();
    iniciarMQTT();
  }, []);

  return (
    <View style={styles.container}>
      <GraficoTemperatura />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
});



// // //front precisa receber temperatura, umidade e se a bomba está ligada ou desligada
// // //front precisa passar se a bomba vai ligar e desligar

// // //SQLite


// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
// import mqtt from 'mqtt';

// const Teste = () => {
//   const [temperatura, setTemperatura] = useState('');
//   const [umidade, setUmidade] = useState('');
//   const [bombaStatus, setBombaStatus] = useState('');
//   const [comando, setComando] = useState('');

//   const [client, setClient] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);

//   useEffect(() => {
//     // Conecta ao broker MQTT
//     const mqttClient = mqtt.connect('wss://broker.hivemq.com:8884/mqtt');

//     mqttClient.on('connect', () => {
//       setIsConnected(true);
//       console.log('Conectado ao broker');

//       // Se inscreve nos tópicos esperados
//       mqttClient.subscribe('sensor/temperatura');
//       mqttClient.subscribe('sensor/umidade');
//       mqttClient.subscribe('bomba/status');
//     });

//     mqttClient.on('message', (topic, message) => {
//       const payload = message.toString();
//       if (topic === 'sensor/temperatura') setTemperatura(payload);
//       if (topic === 'sensor/umidade') setUmidade(payload);
//       if (topic === 'bomba/status') setBombaStatus(payload);
//     });

//     mqttClient.on('error', (err) => {
//       console.error('Erro MQTT:', err);
//     });

//     setClient(mqttClient);

//     return () => {
//       mqttClient.end();
//     };
//   }, []);

//   const enviarComando = () => {
//     if (client && isConnected && (comando === 'ligar' || comando === 'desligar')) {
//       client.publish('bomba/comando', comando);
//       console.log('Comando enviado:', comando);
//     } else {
//       console.warn('Comando inválido ou desconectado.');
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.titulo}>Monitoramento via MQTT</Text>

//       <Text style={styles.label}>Temperatura:</Text>
//       <Text style={styles.valor}>{temperatura} ºC</Text>

//       <Text style={styles.label}>Umidade:</Text>
//       <Text style={styles.valor}>{umidade} %</Text>

//       <Text style={styles.label}>Status da Bomba:</Text>
//       <Text style={[styles.valor, bombaStatus === 'ligada' ? styles.ligada : styles.desligada]}>
//         {bombaStatus || 'Desconhecido'}
//       </Text>

//       <Text style={styles.label}>Comando:</Text>
//       <TextInput
//         style={styles.input}
//         value={comando}
//         onChangeText={setComando}
//         placeholder="Digite ligar ou desligar"
//       />

//       <Button title="Enviar Comando" onPress={enviarComando} />
//     </ScrollView>
//   );
// };

// export default Teste;

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 20,
//     backgroundColor: '#ECFFD4',
//     justifyContent: 'center',
//   },
//   titulo: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//     color: '#2E5939',
//   },
//   label: {
//     marginTop: 10,
//     fontWeight: '600',
//   },
//   valor: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   ligada: {
//     color: 'green',
//   },
//   desligada: {
//     color: 'red',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#aaa',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//   },
// });




// // import { StyleSheet, Text, View } from 'react-native'
// // import React, { useState } from 'react'
// // import { TextInput } from 'react-native-web';
// // import mqtt from 'mqtt';

// // const Teste = () => {
// //   const [texto, setTexto] = useState('Valor inicial carregado');

  
// //   return (
// //     <View style={styles.container}>
// //       <TextInput
// //         style={styles.input}
// //         value={texto}
// //         onChangeText={setTexto}
// //         placeholder="Digite algo"
// //       />
// //     </View>
// //   )
// // }

// // export default Teste

// // const styles = StyleSheet.create({})