// import React, { useEffect, useState } from 'react';
// import { addTemperatura, getTemperaturas } from './database/database';

// export default function App() {
//   const [dados, setDados] = useState([]);

//   useEffect(() => {
//     // Adiciona um dado exemplo
//     addTemperatura(25.5);

//     // Busca dados e atualiza estado
//     getTemperaturas().then(t => setDados(t));
//   }, []);

//   return (
//     <div>
//       <h1>Temperaturas armazenadas</h1>
//       <ul>
//         {dados.map(d => (
//           <li key={d.id}>{d.valor} °C em {new Date(d.data).toLocaleString()}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }



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


//precisa retornar true ou false dependendo de ter sensor ou não
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




// import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { useLocalSearchParams, useRouter } from 'expo-router'
// import Logo from '../assets/img/Logo.svg'
// import Config from '../assets/img/Configuracoes.svg'
// import Interrogacao from '../assets/img/Interrogacao.png'
// import mqtt from 'mqtt';
// import Dexie from 'dexie';

// import { Buffer } from 'buffer';
// global.Buffer = Buffer;

// import { decode, encode } from 'base-64';
// global.atob = decode;
// global.btoa = encode;

// import { TextEncoder, TextDecoder } from 'text-encoding';
// global.TextEncoder = TextEncoder;
// global.TextDecoder = TextDecoder;

// //precisa retornar true ou false dependendo de ter sensor ou não
// const Home = ({ hasSensor = true }) => {

//  const [nome, setNome] = useState('');
// const [temperatura, setTemperatura] = useState('');
//   const [umidade, setUmidade] = useState('');
//   const [bombaStatus, setBombaStatus] = useState('');
//   const [comando, setComando] = useState('');

//   const [client, setClient] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);

//    const params = useLocalSearchParams();

//   const [sensores, setSensores] = useState([

//      { id: 1, nome: 'Sensor A', temperatura: 72, umidade: 0.5, chuva: -3 },
//   ])

//     const router = useRouter();

//     useEffect(() => {
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

//   useEffect(() => {
//   if (params?.id) {
//     const novoSensor = {
//       id: Number(params.id),
//       nome: params.nome,
//       temperatura: Number(params.temperatura),
//       umidade: Number(params.umidade),
//       chuva: Number(params.chuva),
//     };

//     setSensores((prev) => {
//       // Evita duplicados com base no ID
//       if (prev.some((s) => s.id === novoSensor.id)) return prev;
//       return [...prev, novoSensor];
//     });
//   }
// }, [params]);


//   return (
//     <View style={styles.container}>
  
//       {/* Conteúdo rolável */}
//       <ScrollView style={styles.scrollContent}>
//         {hasSensor ? (
//           <View>
//             {sensores.map((sensor) => (
//               <View>
//                     {/* Cabeçalho */}
//         <View style={styles.cabecalho}>
//           <Image source={Logo} style={styles.img} />
//           <Text style={styles.title}>{sensor.nome}</Text>
//           <Image source={Config} onClick={() => router.push({ pathname: '/sensor', params: { id: sensor.id, nome: sensor.nome, temperatura: sensor.temperatura, umidade: sensor.umidade, chuva: sensor.chuva } })}  style={[styles.config, {width: 24, height: 24}]} resizeMode="contain" />
//         </View>
//               <View  style={styles.cardGroup}>
              
//               {/* <TouchableOpacity key={sensor.id} onPress={() => router.push({ pathname: '/sensor', params: { id: sensor.id, nome: sensor.nome, temperatura: sensor.temperatura, umidade: sensor.umidade, chuva: sensor.chuva } })}> */}
//                   <View style={styles.card}>
//                     <Text style={{fontSize:16}}>
//                       <Text style={{fontWeight:'bold'}}>Temperatura: </Text>
//                       {sensor.temperatura}</Text>
//                     <View style={{backgroundColor: '#ECFFD4', height:300}}>
//                     </View>
//                   </View>
//                   <View style={styles.card}>
//                     <Text style={{fontSize:16}}>
//                       <Text style={{fontWeight:'bold'}}>Umidade: </Text>
//                       {sensor.umidade}</Text>
//                     <View style={{backgroundColor: '#ECFFD4', height:300}}>
//                     </View>
//                   </View>

//                   <TouchableOpacity onPress={() => router.push('/teste')}>
//                     <Text>Teste</Text>
//                   </TouchableOpacity>
                  
//               {/* </TouchableOpacity> */}
//               </View>
//               </View>
//             ))}
//           </View>
//         ) : (
//           <View>
//             <View style={styles.cabecalho}>
//           <Image source={Logo} style={styles.img} />
//           <Text style={styles.title}>Nenhum sensor</Text>
//         </View>
//             <Text style={styles.textoNullo}>Nenhum sensor foi adicionado!</Text>
//           </View>
//         )}
//       </ScrollView>

//       {/* Rodapé fixo */}
//       <View style={styles.rodape}>
//         {/* <TouchableOpacity style={styles.btn} onPress={() => router.push('/adicionar')}>
//           <Text style={styles.btnText}>+</Text>
//         </TouchableOpacity>        
//         <TouchableOpacity style={styles.btn} onPress={() => router.push('/ajuda')}>
//           <Text style={styles.btnText}>?</Text>
//         </TouchableOpacity> */}
//         <TouchableOpacity style={styles.btn} onPress={() => router.push('/adicionar')}>
//                   <Text style={styles.btnText}>Adicionar</Text>
//                 </TouchableOpacity>
//         <TouchableOpacity style={styles.btn} onPress={() => router.push('/ajuda')}>
//                   <Text style={styles.btnText}>Ajuda</Text>
//                 </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

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



// import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'expo-router';
// import Logo from '../assets/img/Logo.svg';
// import Config from '../assets/img/Configuracoes.svg';
// import mqtt from 'mqtt';

// import { Buffer } from 'buffer';
// import { decode, encode } from 'base-64';
// import { TextEncoder, TextDecoder } from 'text-encoding';
// import { addTemperatura, getTemperaturas } from './database/database';

// import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';

// global.Buffer = Buffer;
// global.atob = decode;
// global.btoa = encode;
// global.TextEncoder = TextEncoder;
// global.TextDecoder = TextDecoder;

// const Home = ({ hasSensor = true }) => {
//   const router = useRouter();

//   const [nome, setNome] = useState('');
//   const [temperatura, setTemperatura] = useState('');
//   const [umidade, setUmidade] = useState('');
//   const [bombaStatus, setBombaStatus] = useState('');
//   const [comando, setComando] = useState('');

//   const [client, setClient] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);

//   const [dadosTemperatura, setDadosTemperatura] = useState([]);

//   useEffect(() => {
//     const mqttClient = mqtt.connect('wss://broker.hivemq.com:8884/mqtt');

//     mqttClient.on('connect', () => {
//       setIsConnected(true);
//       console.log('✅ Conectado ao broker');

//       mqttClient.subscribe('sensor/nome');
//       mqttClient.subscribe('sensor/temperatura');
//       mqttClient.subscribe('sensor/umidade');
//       mqttClient.subscribe('bomba/status');
//     });

//     mqttClient.on('message', (topic, message) => {
//       const payload = message.toString();

//       if (topic === 'sensor/nome') setNome(payload);
//       if (topic === 'sensor/temperatura') {
//         setTemperatura(payload);
//         const valor = parseFloat(payload);
//         if (!isNaN(valor)) {
//           addTemperatura(valor).then(() => carregarTemperaturas());
//         }
//       }
//       if (topic === 'sensor/umidade') setUmidade(payload);
//       if (topic === 'bomba/status') setBombaStatus(payload);
//     });

//     mqttClient.on('error', (err) => {
//       console.error('❌ Erro MQTT:', err);
//     });

//     setClient(mqttClient);

//     // Carrega dados iniciais do banco ao montar o componente
//     carregarTemperaturas();

//     return () => mqttClient.end();
//   }, []);

//   const carregarTemperaturas = async () => {
//     const dados = await getTemperaturas();
//     // Formata para Victory: x = data formatada, y = valor
//     const dadosFormatados = dados.map((item) => ({
//       x: new Date(item.data).toLocaleDateString('pt-BR'),
//       y: item.valor,
//     }));
//     setDadosTemperatura(dadosFormatados);
//   };

//   const enviarComando = () => {
//     if (client && isConnected && (comando === 'ligar' || comando === 'desligar')) {
//       client.publish('bomba/comando', comando);
//       console.log('Comando enviado:', comando);
//     } else {
//       console.warn('⚠️ Comando inválido ou desconectado.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView style={styles.scrollContent}>
//         {hasSensor ? (
//           <View>
//             <View style={styles.cabecalho}>
//               <Image source={Logo} style={styles.img} />
//               <Text style={styles.title}>{nome || 'Sensor conectado'}</Text>
//               <Image
//                 source={Config}
//                 href="/sensor"
//                 style={[styles.config, { width: 24, height: 24 }]}
//                 resizeMode="contain"
//               />
//             </View>

//             <View style={styles.cardGroup}>
//               <View style={styles.card}>
//                 <Text style={{ fontSize: 16 }}>
//                   <Text style={{ fontWeight: 'bold' }}>Temperatura: </Text>
//                   {temperatura || '---'} °C
//                 </Text>

//                 {dadosTemperatura.length > 0 ? (
//                   <VictoryChart
//                     theme={VictoryTheme.material}
//                     domainPadding={20}
//                     height={300}
//                     width={350}
//                   >
//                     <VictoryLine
//                       data={dadosTemperatura}
//                       style={{
//                         data: { stroke: '#2E5939' },
//                         parent: { border: '1px solid #ccc' },
//                       }}
//                     />
//                   </VictoryChart>
//                 ) : (
//                   <View
//                     style={{ backgroundColor: '#ECFFD4', height: 300, justifyContent: 'center' }}
//                   >
//                     <Text style={{ textAlign: 'center' }}>Sem dados para o gráfico.</Text>
//                   </View>
//                 )}
//               </View>

//               <View style={styles.card}>
//                 <Text style={{ fontSize: 16 }}>
//                   <Text style={{ fontWeight: 'bold' }}>Umidade: </Text>
//                   {umidade || '---'} %
//                 </Text>
//                 <View style={{ backgroundColor: '#ECFFD4', height: 300 }} />
//               </View>

//               <View style={styles.card}>
//                 <Text style={{ fontSize: 16 }}>
//                   <Text style={{ fontWeight: 'bold' }}>Status da Bomba: </Text>
//                   {bombaStatus || '---'}
//                 </Text>
//               </View>

//               <TouchableOpacity onPress={() => router.push('/teste')}>
//                 <Text>Ir para tela de teste</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         ) : (
//           <View>
//             <View style={styles.cabecalho}>
//               <Image source={Logo} style={styles.img} />
//               <Text style={styles.title}>Nenhum sensor</Text>
//             </View>
//             <Text style={styles.textoNullo}>Nenhum sensor foi adicionado!</Text>
//           </View>
//         )}
//       </ScrollView>

//       <View style={styles.rodape}>
//         <TouchableOpacity style={styles.btn} onPress={() => router.push('/adicionar')}>
//           <Text style={styles.btnText}>Adicionar</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.btn} onPress={() => router.push('/ajuda')}>
//           <Text style={styles.btnText}>Ajuda</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

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
//   textoNullo: {
//     textAlign: 'center',
//     padding: 10,
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   config: {
//     cursor: 'pointer',
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
//     marginBottom: 50,
//   },
//   cardGroup: {
//     flexDirection: 'column',
//     padding: 10,
//   },
//   card: {
//     backgroundColor: '#C0F7A2',
//     padding: 20,
//     borderRadius: 5,
//     marginVertical: 10,
//     width: '90%',
//     alignSelf: 'center',
//   },
//   btn: {
//     width: 100,
//     height: 30,
//     backgroundColor: '#ffffff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 100,
//   },
//   btnText: {
//     color: '#2E5939',
//     fontWeight: 'bold',
//   },
// });




// import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
// import React, { useEffect, useState, useRef  } from 'react';
// import { useRouter } from 'expo-router';
// import Logo from '../assets/img/Logo.svg';
// import Config from '../assets/img/Configuracoes.svg';
// import mqtt from 'mqtt';

// import { Buffer } from 'buffer';
// import { decode, encode } from 'base-64';
// import { TextEncoder, TextDecoder } from 'text-encoding';
// import { getLeituras, limparBancoDeDados } from './database/database';

// import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis } from 'victory';


// global.Buffer = Buffer;
// global.atob = decode;
// global.btoa = encode;
// global.TextEncoder = TextEncoder;
// global.TextDecoder = TextDecoder;

// const Home = ({ hasSensor = true }) => {
//   const router = useRouter();

//   const [nome, setNome] = useState('');
//   const [temperatura, setTemperatura] = useState('');
//   const [umidade, setUmidade] = useState('');
//   const [bombaStatus, setBombaStatus] = useState('');
//   const [dados, setDados] = useState([]);

//   const [client, setClient] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);

//   const jaSalvouManha = useRef(false);
// const jaSalvouTarde = useRef(false);

//   useEffect(() => {
//     const mqttClient = mqtt.connect('wss://broker.hivemq.com:8884/mqtt');

//     mqttClient.on('connect', () => {
//       setIsConnected(true);
//       mqttClient.subscribe('sensor/nome');
//       mqttClient.subscribe('sensor/temperatura');
//       mqttClient.subscribe('sensor/umidade');
//       mqttClient.subscribe('bomba/status');
//     });

//     mqttClient.on('message', (topic, message) => {
//       const payload = message.toString();

//       if (topic === 'sensor/nome') setNome(payload);
//       if (topic === 'sensor/temperatura') {
//         setTemperatura(payload);
//         const valor = parseFloat(payload);
//         if (!isNaN(valor)) {
//         const agora = new Date();
//         const hora = agora.getHours();

//         // Salvar apenas uma vez pela manhã
//         if (hora < 12 && !jaSalvouManha.current) {
//          // addTemperatura(valor);
//           jaSalvouManha.current = true;
//           console.log('🌅 Temperatura salva (manhã)');
//         }

//         // Salvar apenas uma vez à tarde
//         if (hora >= 12 && !jaSalvouTarde.current) {
//           //addTemperatura(valor);
//           jaSalvouTarde.current = true;
//           console.log('🌇 Temperatura salva (tarde)');
//         }
//       }
//       }
//       if (topic === 'sensor/umidade') setUmidade(payload);
//       if (topic === 'bomba/status') setBombaStatus(payload);
//     });

//     setClient(mqttClient);
//     return () => mqttClient.end();
//   }, []);

//   const atualizarDados = async () => {
//   //const leituras = await getLeituras();
//   useEffect(() => {
//   async function carregarDados() {
//     const dados = await getLeituras();
//     console.log(dados);
//   }
//   carregarDados();
// }, []);

//   const agrupadas = leituras.reduce((acc, leitura) => {
//     const data = leitura.data.split('T')[0];
//     const periodo = new Date(leitura.data).getHours() < 12 ? 'Manhã' : 'Tarde';
//     const key = `${data} ${periodo}`;
//     acc.push({ x: key, y: leitura.valor });
//     return acc;
//   }, []);

//   setDados(agrupadas);
// };


//   return (
//     <View style={styles.container}>
//       <ScrollView style={styles.scrollContent}>
//         {hasSensor ? (
//           <View>
//             <View style={styles.cabecalho}>
//               <Image source={Logo} style={styles.img} />
//               <Text style={styles.title}>{nome || 'Sensor conectado'}</Text>
//               <TouchableOpacity onPress={() => router.push('/sensor')}>
//                 <Image source={Config} style={[styles.config, { width: 24, height: 24 }]} resizeMode="contain" />
//               </TouchableOpacity>
//             </View>
// <TouchableOpacity onPress={async () => {
//   await limparBancoDeDados();
//   alert('Banco de dados limpo!');
// }}>
//   <Text>Limpar banco</Text>
// </TouchableOpacity>
//             <View style={styles.cardGroup}>
//               <View style={styles.card}>
//                 <Text style={{ fontSize: 16 }}>
//                   <Text style={{ fontWeight: 'bold' }}>Temperatura: </Text>
//                   {temperatura || '---'} °C
//                 </Text>
//                 <VictoryChart theme={VictoryTheme.material}>
//                   <VictoryAxis fixLabelOverlap />
//                   <VictoryAxis dependentAxis />
//                   <VictoryLine data={dados} style={{ data: { stroke: 'tomato' } }} />
//                 </VictoryChart>
//               </View>

//               <View style={styles.card}>
//                 <Text style={{ fontSize: 16 }}>
//                   <Text style={{ fontWeight: 'bold' }}>Umidade: </Text>
//                   {umidade || '---'} %
//                 </Text>
//               </View>

//               <View style={styles.card}>
//                 <Text style={{ fontSize: 16 }}>
//                   <Text style={{ fontWeight: 'bold' }}>Status da Bomba: </Text>
//                   {bombaStatus || '---'}
//                 </Text>
//               </View>
//             </View>
//           </View>
//         ) : (
//           <View>
//             <View style={styles.cabecalho}>
//               <Image source={Logo} style={styles.img} />
//               <Text style={styles.title}>Nenhum sensor</Text>
//             </View>
//             <Text style={styles.textoNullo}>Nenhum sensor foi adicionado!</Text>
//           </View>
//         )}
//       </ScrollView>

//       <View style={styles.rodape}>
//         <TouchableOpacity style={styles.btn} onPress={() => router.push('/adicionar')}>
//           <Text style={styles.btnText}>Adicionar</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.btn} onPress={() => router.push('/ajuda')}>
//           <Text style={styles.btnText}>Ajuda</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default Home;

import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'expo-router';
import Logo from '../assets/img/Logo.svg';
import Config from '../assets/img/Configuracoes.svg';
import mqtt from 'mqtt';

import { Buffer } from 'buffer';
import { decode, encode } from 'base-64';
import { TextEncoder, TextDecoder } from 'text-encoding';
import { addLeitura, getLeituras, limparBancoDeDados } from './database/database';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis } from 'victory';

global.Buffer = Buffer;
global.atob = decode;
global.btoa = encode;
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const Home = ({ hasSensor = true }) => {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [temperatura, setTemperatura] = useState('');
  const [umidade, setUmidade] = useState('');
  const [bombaStatus, setBombaStatus] = useState('');
  const [dadosTemperatura, setDadosTemperatura] = useState([]);
  const [dadosUmidade, setDadosUmidade] = useState([]);
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const jaSalvouManha = useRef(false);
  const jaSalvouTarde = useRef(false);

  useEffect(() => {
    const mqttClient = mqtt.connect('wss://broker.hivemq.com:8884/mqtt');


    let temp = '';
let umi = '';

mqttClient.on('message', (topic, message) => {
  const payload = message.toString();

  if (topic === 'sensor/nome') setNome(payload);
  if (topic === 'sensor/temperatura') {
    setTemperatura(payload);
    temp = payload;
  }
  if (topic === 'sensor/umidade') {
    setUmidade(payload);
    umi = payload;
  }
  if (topic === 'bomba/status') setBombaStatus(payload);

  if (temp && umi) {
    const agora = new Date();
    const hora = agora.getHours();
    const periodo = hora < 12 ? 'Manhã' : 'Tarde';
    const ref = periodo === 'Manhã' ? jaSalvouManha : jaSalvouTarde;

    if (!ref.current) {
      addLeitura({
        idSensor: 1,
        temperatura: parseFloat(temp),
        umidade: parseFloat(umi),
      });
      ref.current = true;
    }
  }
});


    // mqttClient.on('connect', () => {
    //   setIsConnected(true);
    //   mqttClient.subscribe('sensor/nome');
    //   mqttClient.subscribe('sensor/temperatura');
    //   mqttClient.subscribe('sensor/umidade');
    //   mqttClient.subscribe('bomba/status');
    // });

    mqttClient.on('message', async (topic, message) => {
      const payload = message.toString();

      if (topic === 'sensor/nome') setNome(payload);
if (topic === 'sensor/temperatura') {
  setTemperatura(payload);
}
if (topic === 'sensor/umidade') {
  setUmidade(payload);
}
      if (topic === 'bomba/status') setBombaStatus(payload);

      const temp = parseFloat(payload);
      const umid = parseFloat(umidade);

      if (!isNaN(temp) && !isNaN(umid)) {
        const agora = new Date();
        const hora = agora.getHours();
        const periodo = hora < 12 ? 'Manhã' : 'Tarde';

        if (
  temperatura &&
  umidade &&
  !jaSalvouManha.current &&
  !jaSalvouTarde.current
) {
  const hora = new Date().getHours();
  const periodo = hora < 12 ? 'Manhã' : 'Tarde';
  const ref = periodo === 'Manhã' ? jaSalvouManha : jaSalvouTarde;

  if (!ref.current) {
    addLeitura({
      idSensor: 1,
      temperatura: parseFloat(temperatura),
      umidade: parseFloat(umidade),
    });
    ref.current = true;
  }
}}
    });

    setClient(mqttClient);
    return () => mqttClient.end();
  }, [umidade]);

  useEffect(() => {
    async function carregarDados() {
      const leituras = await getLeituras();

      const agrupadasTemp = leituras.map((leitura) => ({
      x: `${leitura.data} ${leitura.periodo}`,
      y: leitura.temperatura,
    }));
      const agrupadasUmid = leituras.map((leitura) => ({
      x: `${leitura.data} ${leitura.periodo}`,
      y: leitura.umidade,
    }));

      setDadosTemperatura(agrupadasTemp);
    setDadosUmidade(agrupadasUmid);
    }

    carregarDados();
  }, []);


  

//   useEffect(() => {
//   const resetar = async () => {
//     await resetDatabase();
//   };
//   resetar();
// }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        {hasSensor ? (
          <>
            <View style={styles.cabecalho}>
              <Image source={Logo} style={styles.img} />
              <Text style={styles.title}>{nome || 'Sensor conectado'}</Text>
              <TouchableOpacity onPress={() => router.push('/sensor')}>
                 <Image source={Config} style={[styles.config, { width: 24, height: 24 }]} resizeMode="contain" />
               </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={async () => {
              await limparBancoDeDados();
              alert('Banco de dados limpo!');
            }}>
              <Text style={{ textAlign: 'center', margin: 10 }}>🧹 Limpar banco</Text>
            </TouchableOpacity>

            <View style={styles.cardGroup}>
              <View style={styles.card}>
                <Text style={{ fontSize: 16 }}>
                  <Text style={{ fontWeight: 'bold' }}>Temperatura: </Text>
                  {temperatura || '---'} °C
                </Text>
                <VictoryChart theme={VictoryTheme.material}>
                  <VictoryAxis fixLabelOverlap />
                  <VictoryAxis dependentAxis />
                  <VictoryLine data={dadosTemperatura} style={{ data: { stroke: 'tomato' } }} />
                </VictoryChart>
              </View>

              <View style={styles.card}>
                  <Text style={{ fontSize: 16 }}>
    <Text style={{ fontWeight: 'bold' }}>Umidade: </Text>
    {umidade || '---'} %
  </Text>
  <VictoryChart theme={VictoryTheme.material}>
    <VictoryAxis fixLabelOverlap />
    <VictoryAxis dependentAxis />
    <VictoryLine data={dadosUmidade} style={{ data: { stroke: 'teal' } }} />
  </VictoryChart>
              </View>

              <View style={styles.card}>
                <Text style={{ fontSize: 16 }}>
                  <Text style={{ fontWeight: 'bold' }}>Status da Bomba: </Text>
                  {bombaStatus || '---'}
                </Text>
              </View>
            </View>
          </>
        ) : (
          <View>
            <Text style={styles.title}>Nenhum sensor foi adicionado</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.rodape}>
        <TouchableOpacity style={styles.btn} onPress={() => router.push('/adicionar')}>
          <Text style={styles.btnText}>Adicionar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => router.push('/ajuda')}>
          <Text style={styles.btnText}>Ajuda</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECFFD4',
    position: 'relative',
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 100,
    backgroundColor: '#2E5939',
  },
  img: {
    width: 80,
    height: 80,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#ffffff',
  },
  textoNullo: {
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  config: {
    cursor: 'pointer',
  },
  rodape: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#2E5939',
  },
  scrollContent: {
    flex: 1,
    marginBottom: 50,
  },
  cardGroup: {
    flexDirection: 'column',
    padding: 10,
  },
  card: {
    backgroundColor: '#C0F7A2',
    padding: 20,
    borderRadius: 5,
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
  },
  btn: {
    width: 100,
    height: 30,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  btnText: {
    color: '#2E5939',
    fontWeight: 'bold',
  },
});
