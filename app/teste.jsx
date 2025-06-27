import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from './database/firebaseConfig';
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'expo-router';
import Logo from '../assets/img/Logo.svg';
import Config from '../assets/img/Configuracoes.svg';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis } from 'victory';

const Teste = ({ hasSensor = true }) => {
  const router = useRouter();
  const [leituras, setLeituras] = useState([]);
  const [nome, setNome] = useState('');
  const [temperatura, setTemperatura] = useState('');
  const [umidade, setUmidade] = useState('');
  const [bombaStatus, setBombaStatus] = useState('');
  const [dadosTemperatura, setDadosTemperatura] = useState([]);
  const [dadosUmidade, setDadosUmidade] = useState([]);

  // Função para formatar timestamp para horário de Brasília
  const formatarTimestamp = (ts) => {
    if (!ts || ts.length < 14) return '';
    
    const ano = parseInt(ts.slice(0, 4));
    const mes = parseInt(ts.slice(4, 6)) - 1;
    const dia = parseInt(ts.slice(6, 8));
    const hora = parseInt(ts.slice(8, 10));
    const minuto = parseInt(ts.slice(10, 12));
    const segundo = parseInt(ts.slice(12, 14));

    const dataUTC = new Date(Date.UTC(ano, mes, dia, hora, minuto, segundo));
    const dataBrasilia = new Date(dataUTC.getTime() - 3 * 60 * 60 * 1000);

    return dataBrasilia.toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      hour12: false,
    });
  };

  // Carrega dados do Firebase
  useEffect(() => {
    const db = getDatabase(app);
    const sensoresRef = ref(db, 'sensors');

    const unsubscribe = onValue(sensoresRef, (snapshot) => {
      if (snapshot.exists()) {
        const dados = snapshot.val();
        const leiturasPorHora = new Map();

        Object.entries(dados).forEach(([_, sensorObj]) => {
          Object.entries(sensorObj).forEach(([nomeSensor, leitura]) => {
            const timestamp = leitura.timestamp;
            const horaChave = timestamp.slice(0, 10);

            const chaveUnica = `${nomeSensor}-${horaChave}`;
            if (!leiturasPorHora.has(chaveUnica)) {
              leiturasPorHora.set(chaveUnica, {
                nomeSensor,
                temperatura: leitura.temperature,
                umidade: leitura.humidity,
                timestamp,
              });
            }
          });
        });

        const ordenadas = Array.from(leiturasPorHora.values()).sort(
          (a, b) => b.timestamp.localeCompare(a.timestamp)
        );

        setLeituras(ordenadas);
        
        // Atualiza os dados para os gráficos
        const agrupadasTemp = ordenadas.map((leitura) => ({
          x: formatarTimestamp(leitura.timestamp),
          y: leitura.temperatura,
        }));

        const agrupadasUmid = ordenadas.map((leitura) => ({
          x: formatarTimestamp(leitura.timestamp),
          y: leitura.umidade,
        }));

        setDadosTemperatura(agrupadasTemp);
        setDadosUmidade(agrupadasUmid);
        
        // Atualiza os valores mais recentes
        if (ordenadas.length > 0) {
          const ultimaLeitura = ordenadas[0];
          setTemperatura(ultimaLeitura.temperatura);
          setUmidade(ultimaLeitura.umidade);
          setNome(ultimaLeitura.nomeSensor);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        {hasSensor ? (
          <>
            <View style={styles.cabecalho}>
              <Image source={Logo} style={styles.img} />
              <Text style={styles.title}>{nome || 'Sensor conectado'}</Text>
              <TouchableOpacity
                onPress={() => router.push('/sensor')}
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
{/* histórico de registros de temperatura */}
            {/* <Text style={styles.title}>Histórico de Leituras</Text>
            {leituras.map((leitura, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.label}>Sensor: <Text style={styles.value}>{leitura.nomeSensor}</Text></Text>
                <Text style={styles.label}>Temperatura: <Text style={styles.value}>{leitura.temperatura} °C</Text></Text>
                <Text style={styles.label}>Umidade: <Text style={styles.value}>{leitura.umidade} %</Text></Text>
                <Text style={styles.label}>Horário: <Text style={styles.value}>{formatarTimestamp(leitura.timestamp)}</Text></Text>
              </View>
            ))} */}
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
export default Teste;
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
    marginVertical: 10,
    textAlign: 'center',
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
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontWeight: 'normal',
  },
});



// import { getDatabase, ref, onValue } from 'firebase/database';
// import { app } from './database/firebaseConfig'; // <- caminho fornecido por você
// import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
// import React, { useEffect, useState, useRef } from 'react';
// import { useRouter } from 'expo-router';
// import Logo from '../assets/img/Logo.svg';
// import Config from '../assets/img/Configuracoes.svg';
// import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis } from 'victory';

// const LeiturasFirebase = ({ hasSensor = true }) => {
//   const router = useRouter();
//   const [leituras, setLeituras] = useState([]);

//   useEffect(() => {
//     const db = getDatabase(app);
//     const sensoresRef = ref(db, 'sensors');

//     const unsubscribe = onValue(sensoresRef, (snapshot) => {
//       if (snapshot.exists()) {
//         const dados = snapshot.val();
//         const leiturasPorHora = new Map();

//         Object.entries(dados).forEach(([_, sensorObj]) => {
//           Object.entries(sensorObj).forEach(([nomeSensor, leitura]) => {
//             const timestamp = leitura.timestamp;
//             const horaChave = timestamp.slice(0, 10); // YYYYMMDDHH

//             const chaveUnica = `${nomeSensor}-${horaChave}`;
//             if (!leiturasPorHora.has(chaveUnica)) {
//               leiturasPorHora.set(chaveUnica, {
//                 nomeSensor,
//                 temperatura: leitura.temperature,
//                 umidade: leitura.humidity,
//                 timestamp,
//               });
//             }
//           });
//         });

//         const ordenadas = Array.from(leiturasPorHora.values()).sort(
//           (a, b) => b.timestamp.localeCompare(a.timestamp)
//         );

//         setLeituras(ordenadas);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   // ⏰ Converte o timestamp para o horário de Brasília (UTC-3)
//   const formatarTimestamp = (ts) => {
//     if (!ts || ts.length < 14) return '';

//     const ano = parseInt(ts.slice(0, 4));
//     const mes = parseInt(ts.slice(4, 6)) - 1; // mês começa em 0
//     const dia = parseInt(ts.slice(6, 8));
//     const hora = parseInt(ts.slice(8, 10));
//     const minuto = parseInt(ts.slice(10, 12));
//     const segundo = parseInt(ts.slice(12, 14));

//     const dataUTC = new Date(Date.UTC(ano, mes, dia, hora, minuto, segundo));
//     const dataBrasilia = new Date(dataUTC.getTime() - 3 * 60 * 60 * 1000); // -3h

//     return dataBrasilia.toLocaleString('pt-BR', {
//       timeZone: 'America/Sao_Paulo',
//       hour12: false,
//     });
//   };

//  useEffect(() => {
//     async function carregarDados() {
//       const leituras = await setLeituras();

//       const agrupadasTemp = leituras.map((leitura) => ({
//         //x: `${leitura.data} ${leitura.periodo}`,
//         x: `${leitura.data} - ${leitura.hora}h`,
//         y: leitura.temperatura,
//       }));

//       const agrupadasUmid = leituras.map((leitura) => ({
//         //x: `${leitura.data} ${leitura.periodo}`,
//         x: `${leitura.data} - ${leitura.hora}h`,
//         y: leitura.umidade,
//       }));

//       setDadosTemperatura(agrupadasTemp);
//       setDadosUmidade(agrupadasUmid);
//     }

//     carregarDados();
//   }, []);


//   return (
//     <>
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Leituras por Hora (Horário de Brasília)</Text>

//       {leituras.map((leitura, index) => (
//         <View key={index} style={styles.card}>
//           <Text style={styles.label}>Sensor: <Text style={styles.value}>{leitura.nomeSensor}</Text></Text>
//           <Text style={styles.label}>Temperatura: <Text style={styles.value}>{leitura.temperatura} °C</Text></Text>
//           <Text style={styles.label}>Umidade: <Text style={styles.value}>{leitura.umidade} %</Text></Text>
//           <Text style={styles.label}>Horário: <Text style={styles.value}>{formatarTimestamp(leitura.timestamp)}</Text></Text>
//         </View>
//       ))}
//     </ScrollView>
//     <View style={styles.container}>
//       <ScrollView style={styles.scrollContent}>
//         {hasSensor ? (
//           <>
//             <View style={styles.cabecalho}>
//               <Image source={Logo} style={styles.img} />
//               <Text style={styles.title}>{nome || 'Sensor conectado'}</Text>
//               <TouchableOpacity
//                 onPress={async () => {
//                   const leituras = await getLeituras();
//                   const ultimaLeitura = leituras[leituras.length - 1]; // pega o idSensor mais recente
//                   const idSensor = ultimaLeitura?.idSensor || 999; // fallback

//                   const sensorConfig = await getSensorById(idSensor);

//                   // router.push({
//                   //   pathname: '/sensor',
//                   //   params: {
//                   //     dados: JSON.stringify(leituras),
//                   //     config: JSON.stringify(sensorConfig),
//                   //   },
//                   // });
//                   router.push({
//                     pathname: '/sensor'
//                   });
//                 }}
//               >
//                 <Image source={Config} style={[styles.config, { width: 24, height: 24 }]} resizeMode="contain" />
//               </TouchableOpacity>
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
//                 <Text style={{ fontSize: 16 }}>
//                   <Text style={{ fontWeight: 'bold' }}>Umidade: </Text>
//                   {umidade || '---'} %
//                 </Text>
//                 <VictoryChart theme={VictoryTheme.material}>
//                   <VictoryAxis fixLabelOverlap />
//                   <VictoryAxis dependentAxis />
//                   <VictoryLine data={dadosUmidade} style={{ data: { stroke: 'teal' } }} />
//                 </VictoryChart>
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
//     </>
//   );
// };

// export default LeiturasFirebase;

// const styles = StyleSheet.create({
//  container: {
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
