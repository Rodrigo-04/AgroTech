import React, { useEffect, useState } from 'react';
import { addTemperatura, getTemperaturas } from './database/database';

export default function App() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    // Adiciona um dado exemplo
    addTemperatura(25.5);

    // Busca dados e atualiza estado
    getTemperaturas().then(t => setDados(t));
  }, []);

  return (
    <div>
      <h1>Temperaturas armazenadas</h1>
      <ul>
        {dados.map(d => (
          <li key={d.id}>{d.valor} °C em {new Date(d.data).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
}



// import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { useLocalSearchParams, useRouter } from 'expo-router'
// import Logo from '../assets/img/Logo.svg'
// import Config from '../assets/img/Configuracoes.svg'
// import Interrogacao from '../assets/img/Interrogacao.png'
// import mqtt from 'mqtt';

// import { Buffer } from 'buffer';
// global.Buffer = Buffer;

// import { decode, encode } from 'base-64';
// global.atob = decode;
// global.btoa = encode;

// import { TextEncoder, TextDecoder } from 'text-encoding';
// global.TextEncoder = TextEncoder;
// global.TextDecoder = TextDecoder;


// //precisa retornar true ou false dependendo de ter sensor ou não
// const Home = () => {

//   const [nome, setNome] = useState('');
// const [temperatura, setTemperatura] = useState('');
//   const [umidade, setUmidade] = useState('');
//   const [bombaStatus, setBombaStatus] = useState('');
//   const [comando, setComando] = useState('');

//   const [client, setClient] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);

//     const router = useRouter();

// useEffect(() => {
//     // Conecta ao broker MQTT
//     const mqttClient = mqtt.connect('wss://broker.hivemq.com:8884/mqtt');

//     mqttClient.on('connect', () => {
//       setIsConnected(true);
//       console.log('Conectado ao broker');

//       // Se inscreve nos tópicos esperados
//       mqttClient.subscribe('sensor/nome');
//       mqttClient.subscribe('sensor/temperatura');
//       mqttClient.subscribe('sensor/umidade');
//       mqttClient.subscribe('bomba/status');
//     });

//     mqttClient.on('message', (topic, message) => {
//       const payload = message.toString();
//       if (topic === 'sensor/nome') setNome(payload);
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

//       const enviarComando = () => {
//     if (client && isConnected && (comando === 'ligar' || comando === 'desligar')) {
//       client.publish('bomba/comando', comando);
//       console.log('Comando enviado:', comando);
//     } else {
//       console.warn('Comando inválido ou desconectado.');
//     }
//   };


//   return (
//     <View style={styles.container}>
//       <ScrollView style={styles.scrollContent}>  
//         <View style={styles.cabecalho}>
//           <Image source={Logo} style={styles.img} />
//           <Text style={styles.title}>{nome}</Text>
//           <Image source={Config} onClick={() => router.push({ pathname: '/sensor', params: { id: sensor.id, nome: sensor.nome, temperatura: sensor.temperatura, umidade: sensor.umidade, chuva: sensor.chuva } })}  style={[styles.config, {width: 24, height: 24}]} resizeMode="contain" />
//         </View>
//               <View  style={styles.cardGroup}>
//                <View style={styles.card}>
//                     <Text style={{fontSize:16}}>
//                       <Text style={{fontWeight:'bold'}}>Temperatura: </Text>
//                       {temperatura}</Text>
//                     <View style={{backgroundColor: '#ECFFD4', height:300}}>
//                     </View>
//                   </View>
//                   <View style={styles.card}>
//                     <Text style={{fontSize:16}}>
//                       <Text style={{fontWeight:'bold'}}>Umidade: </Text>
//                       {umidade}</Text>
//                     <View style={{backgroundColor: '#ECFFD4', height:300}}>
//                     </View>
//                   </View>
//                   <TouchableOpacity onPress={() => router.push('/teste')}>
//                     <Text>Teste</Text>
//                   </TouchableOpacity>
//               </View>
//       </ScrollView>

//       <View style={styles.rodape}>

//         <TouchableOpacity style={styles.btn} onPress={() => router.push('/adicionar')}>
//                   <Text style={styles.btnText}>Adicionar</Text>
//                 </TouchableOpacity>
//         <TouchableOpacity style={styles.btn} onPress={() => router.push('/ajuda')}>
//                   <Text style={styles.btnText}>Ajuda</Text>
//                 </TouchableOpacity>
//       </View>
//     </View>
//   )}

// export default Home;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ECFFD4',
//     position: 'relative',
//   },
//   cabecalho: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     height: 100,
//     backgroundColor: '#2E5939',
//   },
//   img: {
//     width: 80,
//     height: 80,
//   },
//   title: {
//     fontWeight: 'bold',
//     fontSize: 20,
//     color: '#ffffff',
//   },
//   texto: {
//     flexDirection: 'row',
//   },
//   textoNullo: {
//     textAlign: 'center',
//     padding: 10,
//     fontSize: 16,
//     fontWeight: 'bold'
//   },
//   config: {
//     cursor: 'pointer'
//   },
//   rodape: {
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//     height: 50,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     backgroundColor: '#2E5939',
//   },
//   scrollContent: {
//     flex: 1,
//     marginBottom: 50, // espaço para o rodapé
//   },
//   cardGroup: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     padding: 10,
//   },
//   card: {
//     backgroundColor: '#C0F7A2',
//     padding: 20,
//     borderRadius: 5,
//     margin: 10,
//     width: 400,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 4, height: 4 },
//   },
//  btn: {
//     width: 30,
//     height: 30,
//     backgroundColor: '#ffffff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 100,
//     width: 100
//   },
//   btnText: {
//     color: '#2E5939',
//     fontWeight: 'bold',
//   },
// });




// // import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
// // import React, { useEffect, useState } from 'react'
// // import { useLocalSearchParams, useRouter } from 'expo-router'
// // import Logo from '../assets/img/Logo.svg'
// // import Config from '../assets/img/Configuracoes.svg'
// // import Interrogacao from '../assets/img/Interrogacao.png'

// // import { Buffer } from 'buffer';
// // global.Buffer = Buffer;

// // import { decode, encode } from 'base-64';
// // global.atob = decode;
// // global.btoa = encode;

// // import { TextEncoder, TextDecoder } from 'text-encoding';
// // global.TextEncoder = TextEncoder;
// // global.TextDecoder = TextDecoder;


// // //precisa retornar true ou false dependendo de ter sensor ou não
// // const Home = ({ hasSensor = true }) => {


// //    const params = useLocalSearchParams();

// //   const [sensores, setSensores] = useState([

// //      { id: 1, nome: 'Sensor A', temperatura: 72, umidade: 0.5, chuva: -3 },
// //   ])

// //     const router = useRouter();

// //   useEffect(() => {
// //   if (params?.id) {
// //     const novoSensor = {
// //       id: Number(params.id),
// //       nome: params.nome,
// //       temperatura: Number(params.temperatura),
// //       umidade: Number(params.umidade),
// //       chuva: Number(params.chuva),
// //     };

// //     setSensores((prev) => {
// //       // Evita duplicados com base no ID
// //       if (prev.some((s) => s.id === novoSensor.id)) return prev;
// //       return [...prev, novoSensor];
// //     });
// //   }
// // }, [params]);


// //   return (
// //     <View style={styles.container}>
  
// //       {/* Conteúdo rolável */}
// //       <ScrollView style={styles.scrollContent}>
// //         {hasSensor ? (
// //           <View>
// //             {sensores.map((sensor) => (
// //               <View>
// //                     {/* Cabeçalho */}
// //         <View style={styles.cabecalho}>
// //           <Image source={Logo} style={styles.img} />
// //           <Text style={styles.title}>{sensor.nome}</Text>
// //           <Image source={Config} onClick={() => router.push({ pathname: '/sensor', params: { id: sensor.id, nome: sensor.nome, temperatura: sensor.temperatura, umidade: sensor.umidade, chuva: sensor.chuva } })}  style={[styles.config, {width: 24, height: 24}]} resizeMode="contain" />
// //         </View>
// //               <View  style={styles.cardGroup}>
              
// //               {/* <TouchableOpacity key={sensor.id} onPress={() => router.push({ pathname: '/sensor', params: { id: sensor.id, nome: sensor.nome, temperatura: sensor.temperatura, umidade: sensor.umidade, chuva: sensor.chuva } })}> */}
// //                   <View style={styles.card}>
// //                     <Text style={{fontSize:16}}>
// //                       <Text style={{fontWeight:'bold'}}>Temperatura: </Text>
// //                       {sensor.temperatura}</Text>
// //                     <View style={{backgroundColor: '#ECFFD4', height:300}}>
// //                     </View>
// //                   </View>
// //                   <View style={styles.card}>
// //                     <Text style={{fontSize:16}}>
// //                       <Text style={{fontWeight:'bold'}}>Umidade: </Text>
// //                       {sensor.umidade}</Text>
// //                     <View style={{backgroundColor: '#ECFFD4', height:300}}>
// //                     </View>
// //                   </View>

// //                   <TouchableOpacity onPress={() => router.push('/teste')}>
// //                     <Text>Teste</Text>
// //                   </TouchableOpacity>
                  
// //               {/* </TouchableOpacity> */}
// //               </View>
// //               </View>
// //             ))}
// //           </View>
// //         ) : (
// //           <View>
// //             <View style={styles.cabecalho}>
// //           <Image source={Logo} style={styles.img} />
// //           <Text style={styles.title}>Nenhum sensor</Text>
// //         </View>
// //             <Text style={styles.textoNullo}>Nenhum sensor foi adicionado!</Text>
// //           </View>
// //         )}
// //       </ScrollView>

// //       {/* Rodapé fixo */}
// //       <View style={styles.rodape}>
// //         {/* <TouchableOpacity style={styles.btn} onPress={() => router.push('/adicionar')}>
// //           <Text style={styles.btnText}>+</Text>
// //         </TouchableOpacity>        
// //         <TouchableOpacity style={styles.btn} onPress={() => router.push('/ajuda')}>
// //           <Text style={styles.btnText}>?</Text>
// //         </TouchableOpacity> */}
// //         <TouchableOpacity style={styles.btn} onPress={() => router.push('/adicionar')}>
// //                   <Text style={styles.btnText}>Adicionar</Text>
// //                 </TouchableOpacity>
// //         <TouchableOpacity style={styles.btn} onPress={() => router.push('/ajuda')}>
// //                   <Text style={styles.btnText}>Ajuda</Text>
// //                 </TouchableOpacity>
// //       </View>
// //     </View>
// //   );
// // };

// // export default Home;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#ECFFD4',
// //     position: 'relative',
// //   },
// //   cabecalho: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-around',
// //     alignItems: 'center',
// //     height: 100,
// //     backgroundColor: '#2E5939',
// //   },
// //   img: {
// //     width: 80,
// //     height: 80,
// //   },
// //   title: {
// //     fontWeight: 'bold',
// //     fontSize: 20,
// //     color: '#ffffff',
// //   },
// //   texto: {
// //     flexDirection: 'row',
// //   },
// //   textoNullo: {
// //     textAlign: 'center',
// //     padding: 10,
// //     fontSize: 16,
// //     fontWeight: 'bold'
// //   },
// //   config: {
// //     cursor: 'pointer'
// //   },
// //   rodape: {
// //     position: 'absolute',
// //     bottom: 0,
// //     width: '100%',
// //     height: 50,
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-around',
// //     backgroundColor: '#2E5939',
// //   },
// //   scrollContent: {
// //     flex: 1,
// //     marginBottom: 50, // espaço para o rodapé
// //   },
// //   cardGroup: {
// //     flexDirection: 'row',
// //     flexWrap: 'wrap',
// //     justifyContent: 'center',
// //     padding: 10,
// //   },
// //   card: {
// //     backgroundColor: '#C0F7A2',
// //     padding: 20,
// //     borderRadius: 5,
// //     margin: 10,
// //     width: 400,
// //     shadowColor: '#000',
// //     shadowOpacity: 0.1,
// //     shadowOffset: { width: 4, height: 4 },
// //   },
// //  btn: {
// //     width: 30,
// //     height: 30,
// //     backgroundColor: '#ffffff',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     borderRadius: 100,
// //     width: 100
// //   },
// //   btnText: {
// //     color: '#2E5939',
// //     fontWeight: 'bold',
// //   },
// // });
