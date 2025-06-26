import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'expo-router';
import Logo from '../assets/img/Logo.svg';
import Config from '../assets/img/Configuracoes.svg';
import mqtt from 'mqtt';
import { Buffer } from 'buffer';
import { decode, encode } from 'base-64';
import { TextEncoder, TextDecoder } from 'text-encoding';
import { addLeitura, getLeituras, limparBancoDeDados, getSensorById  } from './database/database';
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

  // const jaSalvouManha = useRef(false);
  // const jaSalvouTarde = useRef(false);
  const horasSalvas = useRef(new Set());

  useEffect(() => {
    const mqttClient = mqtt.connect('wss://broker.hivemq.com:8884/mqtt');

    mqttClient.on('connect', () => {
      setIsConnected(true);
      mqttClient.subscribe('sensor/nome');
      mqttClient.subscribe('agrotech/esp32fatecSP/12345/temperature');
      mqttClient.subscribe('agrotech/esp32fatecSP/12345/humidity');
      mqttClient.subscribe('bomba/status');
    });

    let ultimaTemperatura = '';
    let ultimaUmidade = '';

    mqttClient.on('message', async (topic, message) => {
      const payload = message.toString();

      // Atualiza os dados ao receber do MQTT
      if (topic === 'sensor/nome') setNome(payload);
      if (topic === 'agrotech/esp32fatecSP/12345/temperature') {
        setTemperatura(payload); // Isso vai refletir no texto da tela
        ultimaTemperatura = payload;
      }
      if (topic === 'agrotech/esp32fatecSP/12345/humidity') {
        setUmidade(payload);
        ultimaUmidade = payload;
      }
      if (topic === 'bomba/status') setBombaStatus(payload);

      // Só salva se ambos temperatura e umidade forem números válidos
      const temperaturaValida = parseFloat(ultimaTemperatura);
      const umidadeValida = parseFloat(ultimaUmidade);

      if (!isNaN(temperaturaValida) && !isNaN(umidadeValida)) {
        const agora = new Date();
        const dataFormatada = agora.toLocaleDateString('pt-BR').split('/').reverse().join('-');
        const hora = agora.getHours();
        //const periodo = hora < 12 ? 'Manhã' : 'Tarde';
        //const ref = periodo === 'Manhã' ? jaSalvouManha : jaSalvouTarde;
        const chaveHora = `${dataFormatada}-${hora}`;

        // Se ainda não salvou neste dia e hora
        if (!horasSalvas.current.has(chaveHora)) {
          await addLeitura({
          idSensor: 999,
          nome, // ← Passa o nome do sensor aqui
          temperatura: temperaturaValida,
          umidade: umidadeValida,
          data: dataFormatada,
          hora,
        });

          // Marca como salva essa hora
          horasSalvas.current.add(chaveHora);
        }
      }
    });

    setClient(mqttClient);
    return () => mqttClient.end();
  }, []);
  

  useEffect(() => {
    async function carregarDados() {
      const leituras = await getLeituras();

      const agrupadasTemp = leituras.map((leitura) => ({
        //x: `${leitura.data} ${leitura.periodo}`,
        x: `${leitura.data} - ${leitura.hora}h`,
        y: leitura.temperatura,
      }));

      const agrupadasUmid = leituras.map((leitura) => ({
        //x: `${leitura.data} ${leitura.periodo}`,
        x: `${leitura.data} - ${leitura.hora}h`,
        y: leitura.umidade,
      }));

      setDadosTemperatura(agrupadasTemp);
      setDadosUmidade(agrupadasUmid);
    }

    carregarDados();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        {hasSensor ? (
          <>
            <View style={styles.cabecalho}>
              <Image source={Logo} style={styles.img} />
              <Text style={styles.title}>{nome || 'Sensor conectado'}</Text>
              {/* <TouchableOpacity onPress={() => router.push('/sensor')}>
                <Image source={Config} style={[styles.config, { width: 24, height: 24 }]} resizeMode="contain" />
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={async () => {
                  const leituras = await getLeituras();
                  const ultimaLeitura = leituras[leituras.length - 1]; // pega o idSensor mais recente
                  const idSensor = ultimaLeitura?.idSensor || 999; // fallback

                  const sensorConfig = await getSensorById(idSensor);

                  router.push({
                    pathname: '/sensor',
                    params: {
                      dados: JSON.stringify(leituras),
                      config: JSON.stringify(sensorConfig),
                    },
                  });
                }}
              >
                <Image source={Config} style={[styles.config, { width: 24, height: 24 }]} resizeMode="contain" />
              </TouchableOpacity>
            </View>

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



// import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
// import React, { useEffect, useState, useRef } from 'react';
// import { useRouter } from 'expo-router';
// import Logo from '../assets/img/Logo.svg';
// import Config from '../assets/img/Configuracoes.svg';
// import mqtt from 'mqtt';
// import { Buffer } from 'buffer';
// import { decode, encode } from 'base-64';
// import { TextEncoder, TextDecoder } from 'text-encoding';
// import { addLeitura, getLeituras, limparBancoDeDados } from './database/database';
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

//   const [dadosTemperatura, setDadosTemperatura] = useState([]);
//   const [dadosUmidade, setDadosUmidade] = useState([]);

//   const [client, setClient] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);

//   const jaSalvouManha = useRef(false);
//   const jaSalvouTarde = useRef(false);

//   useEffect(() => {
//     const mqttClient = mqtt.connect('wss://broker.hivemq.com:8884/mqtt');

//     mqttClient.on('connect', () => {
//       setIsConnected(true);
//       mqttClient.subscribe('sensor/nome');
//       mqttClient.subscribe('sensor/temperatura');
//       mqttClient.subscribe('sensor/umidade');
//       mqttClient.subscribe('bomba/status');
//     });

//     mqttClient.on('message', async (topic, message) => {
//       const payload = message.toString();

//       if (topic === 'sensor/nome') setNome(payload);
//       if (topic === 'sensor/temperatura') {
//         setTemperatura(payload);
//       }
//       if (topic === 'sensor/umidade') {
//         setUmidade(payload);
//       }
//       if (topic === 'bomba/status') setBombaStatus(payload);

//       const temp = parseFloat(payload);
//       const umid = parseFloat(payload);

//       if (!isNaN(temp) && !isNaN(umid)) {
//         const agora = new Date();
//         const hora = agora.getHours();
//         const periodo = hora < 12 ? 'Manhã' : 'Tarde';

//         if (
//   temperatura &&
//   umidade &&
//   !jaSalvouManha.current &&
//   !jaSalvouTarde.current
// ) {
//   const hora = new Date().getHours();
//   const periodo = hora < 12 ? 'Manhã' : 'Tarde';
//   const ref = periodo === 'Manhã' ? jaSalvouManha : jaSalvouTarde;

//   if (!ref.current) {
//     addLeitura({
//       idSensor: 1,
//       temperatura: parseFloat(temperatura),
//       umidade: parseFloat(umidade),
//     });
//     ref.current = true;
//   }
// }}
//     });

//     setClient(mqttClient);
//     return () => mqttClient.end();
//   }, [umidade]);

//   useEffect(() => {
//     async function carregarDados() {
//       const leituras = await getLeituras();

//       const agrupadasTemp = leituras.map((leitura) => ({
//       x: `${leitura.data} ${leitura.periodo}`,
//       y: leitura.temperatura,
//     }));
//       const agrupadasUmid = leituras.map((leitura) => ({
//       x: `${leitura.data} ${leitura.periodo}`,
//       y: leitura.umidade,
//     }));

//       setDadosTemperatura(agrupadasTemp);
//     setDadosUmidade(agrupadasUmid);
//     }

//     carregarDados();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <ScrollView style={styles.scrollContent}>
//         {hasSensor ? (
//           <>
//             <View style={styles.cabecalho}>
//               <Image source={Logo} style={styles.img} />
//               <Text style={styles.title}>{nome || 'Sensor conectado'}</Text>
//               <TouchableOpacity onPress={() => router.push('/sensor')}>
//                  <Image source={Config} style={[styles.config, { width: 24, height: 24 }]} resizeMode="contain" />
//                </TouchableOpacity>
//             </View>

//             <View style={styles.cardGroup}>
//               <View style={styles.card}>
//                 <Text style={{ fontSize: 16 }}>
//                   <Text style={{ fontWeight: 'bold' }}>Temperatura: </Text>
//                   {temperatura || '---'} °C
//                 </Text>
//                 <VictoryChart theme={VictoryTheme.material}>
//                   <VictoryAxis fixLabelOverlap />
//                   <VictoryAxis dependentAxis />
//                   <VictoryLine data={dadosTemperatura} style={{ data: { stroke: 'tomato' } }} />
//                 </VictoryChart>
//               </View>

//               <View style={styles.card}>
//                   <Text style={{ fontSize: 16 }}>
//     <Text style={{ fontWeight: 'bold' }}>Umidade: </Text>
//     {umidade || '---'} %
//   </Text>
//   <VictoryChart theme={VictoryTheme.material}>
//     <VictoryAxis fixLabelOverlap />
//     <VictoryAxis dependentAxis />
//     <VictoryLine data={dadosUmidade} style={{ data: { stroke: 'teal' } }} />
//   </VictoryChart>
//               </View>

//               <View style={styles.card}>
//                 <Text style={{ fontSize: 16 }}>
//                   <Text style={{ fontWeight: 'bold' }}>Status da Bomba: </Text>
//                   {bombaStatus || '---'}
//                 </Text>
//               </View>
//             </View>
//           </>
//         ) : (
//           <View>
//             <Text style={styles.title}>Nenhum sensor foi adicionado</Text>
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
