import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from './database/firebaseConfig';
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import Logo from '../assets/img/Logo.svg';
import Config from '../assets/img/Configuracoes.svg';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis } from 'victory';

const Home = ({ hasSensor = true }) => {
  const router = useRouter();
  const [leituras, setLeituras] = useState([]);
  const [nome, setNome] = useState('');
  const [temperatura, setTemperatura] = useState('');
  const [umidade, setUmidade] = useState('');
  const [dadosTemperatura, setDadosTemperatura] = useState([]);
  const [dadosUmidade, setDadosUmidade] = useState([]);
  const [bombaStatus, setBombaStatus] = useState('');
  const formatarTimestamp = (ts) => {
    if (!ts || ts.length < 14) return '';
    
    const ano = parseInt(ts.slice(0, 4));
    const mes = parseInt(ts.slice(4, 6)) - 1;
    const dia = parseInt(ts.slice(6, 8));
    const hora = parseInt(ts.slice(8, 10));
    const minuto = parseInt(ts.slice(10, 12));
    const segundo = parseInt(ts.slice(12, 14));

    const dataUTC = new Date(Date.UTC(ano, mes, dia, hora, minuto, segundo));
    const offsetBrasilia = -3 * 60 * 60 * 1000;
    const dataBrasilia = new Date(dataUTC.getTime() + offsetBrasilia);

    return dataBrasilia.toLocaleTimeString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatarData = (ts) => {
    if (!ts || ts.length < 14) return '';
    
    const ano = parseInt(ts.slice(0, 4));
    const mes = parseInt(ts.slice(4, 6)) - 1;
    const dia = parseInt(ts.slice(6, 8));
    const hora = parseInt(ts.slice(8, 10));
    const minuto = parseInt(ts.slice(10, 12));
    const segundo = parseInt(ts.slice(12, 14));

    const dataUTC = new Date(Date.UTC(ano, mes, dia, hora, minuto, segundo));
    const offsetBrasilia = -3 * 60 * 60 * 1000;
    const dataBrasilia = new Date(dataUTC.getTime() + offsetBrasilia);

    return dataBrasilia.toLocaleDateString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

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

        // Ordena do mais antigo para o mais novo (esquerda para direita)
        const ordenadas = Array.from(leiturasPorHora.values()).sort(
          (a, b) => a.timestamp.localeCompare(b.timestamp)
        );

        setLeituras(ordenadas);
        
        // Prepara dados para os gráficos (limita às últimas 24 leituras)
        const ultimasLeituras = ordenadas.slice(-24);
        
        const agrupadasTemp = ultimasLeituras.map((leitura) => ({
          x: formatarTimestamp(leitura.timestamp),
          y: leitura.temperatura,
        }));

        const agrupadasUmid = ultimasLeituras.map((leitura) => ({
          x: formatarTimestamp(leitura.timestamp),
          y: leitura.umidade,
        }));

        setDadosTemperatura(agrupadasTemp);
        setDadosUmidade(agrupadasUmid);
        
        if (ultimasLeituras.length > 0) {
          const ultimaLeitura = ultimasLeituras[ultimasLeituras.length - 1];
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
              <TouchableOpacity onPress={() => router.push('/sensor')}>
                <Image source={Config} style={[styles.config, { width: 24, height: 24 }]} resizeMode="contain" />
              </TouchableOpacity>
            </View>

            <View style={styles.cardGroup}>
              <View style={styles.card}>
                <View style={styles.valorContainer}>
                  <Text style={styles.valorTexto}>
                    <Text style={styles.valorLabel}>Temperatura: </Text>
                    {temperatura || '---'} °C
                  </Text>
                  {leituras.length > 0 && (
                    <Text style={styles.dataTexto}>
                      {formatarData(leituras[leituras.length - 1].timestamp)}
                    </Text>
                  )}
                </View>
                <VictoryChart 
                  theme={VictoryTheme.material}
                  domainPadding={20}
                >
                  <VictoryAxis
                    fixLabelOverlap
                    style={{
                      tickLabels: { 
                        angle: -45, 
                        textAnchor: 'end',
                        fontSize: 8 
                      }
                    }}
                  />
                  <VictoryAxis dependentAxis />
                  <VictoryLine 
                    data={dadosTemperatura} 
                    style={{ 
                      data: { stroke: 'tomato', strokeWidth: 2 } 
                    }} 
                  />
                </VictoryChart>
              </View>

              <View style={styles.card}>
                <View style={styles.valorContainer}>
                  <Text style={styles.valorTexto}>
                    <Text style={styles.valorLabel}>Umidade: </Text>
                    {umidade || '---'} %
                  </Text>
                  {leituras.length > 0 && (
                    <Text style={styles.dataTexto}>
                      {formatarData(leituras[leituras.length - 1].timestamp)}
                    </Text>
                  )}
                </View>
                <VictoryChart 
                  theme={VictoryTheme.material}
                  domainPadding={20}
                >
                  <VictoryAxis
                    fixLabelOverlap
                    style={{
                      tickLabels: { 
                        angle: -45, 
                        textAnchor: 'end',
                        fontSize: 8 
                      }
                    }}
                  />
                  <VictoryAxis dependentAxis />
                  <VictoryLine 
                    data={dadosUmidade} 
                    style={{ 
                      data: { stroke: 'teal', strokeWidth: 2 } 
                    }} 
                  />
                </VictoryChart>
              </View>
            </View>
            <View style={styles.card}>
                 <Text style={{ fontSize: 16 }}>
                   <Text style={{ fontWeight: 'bold' }}>Status da Bomba: </Text>
                   {bombaStatus || '---'}
                 </Text>
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
  valorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  valorTexto: {
    fontSize: 16,
  },
  valorLabel: {
    fontWeight: 'bold',
  },
  dataTexto: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
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




// import { getDatabase, ref, onValue } from 'firebase/database';
// import { app } from './database/firebaseConfig';
// import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'expo-router';
// import Logo from '../assets/img/Logo.svg';
// import Config from '../assets/img/Configuracoes.svg';
// import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis } from 'victory';

// const Home = ({ hasSensor = true }) => {
//   const router = useRouter();
//   const [leituras, setLeituras] = useState([]);
//   const [nome, setNome] = useState('');
//   const [temperatura, setTemperatura] = useState('');
//   const [umidade, setUmidade] = useState('');
//   const [dadosTemperatura, setDadosTemperatura] = useState([]);
//   const [dadosUmidade, setDadosUmidade] = useState([]);

//   const formatarTimestamp = (ts) => {
//     if (!ts || ts.length < 14) return '';
    
//     const ano = parseInt(ts.slice(0, 4));
//     const mes = parseInt(ts.slice(4, 6)) - 1;
//     const dia = parseInt(ts.slice(6, 8));
//     const hora = parseInt(ts.slice(8, 10));
//     const minuto = parseInt(ts.slice(10, 12));
//     const segundo = parseInt(ts.slice(12, 14));

//     const dataUTC = new Date(Date.UTC(ano, mes, dia, hora, minuto, segundo));
//     const offsetBrasilia = -3 * 60 * 60 * 1000;
//     const dataBrasilia = new Date(dataUTC.getTime() + offsetBrasilia);

//     return dataBrasilia.toLocaleTimeString('pt-BR', {
//       timeZone: 'America/Sao_Paulo',
//       hour12: false,
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

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
//             const horaChave = timestamp.slice(0, 10);

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

//         // Ordena do mais antigo para o mais novo (esquerda para direita)
//         const ordenadas = Array.from(leiturasPorHora.values()).sort(
//           (a, b) => a.timestamp.localeCompare(b.timestamp)
//         );

//         setLeituras(ordenadas);
        
//         // Prepara dados para os gráficos (limita às últimas 24 leituras)
//         const ultimasLeituras = ordenadas.slice(-24);
        
//         const agrupadasTemp = ultimasLeituras.map((leitura) => ({
//           x: formatarTimestamp(leitura.timestamp),
//           y: leitura.temperatura,
//         }));

//         const agrupadasUmid = ultimasLeituras.map((leitura) => ({
//           x: formatarTimestamp(leitura.timestamp),
//           y: leitura.umidade,
//         }));

//         setDadosTemperatura(agrupadasTemp);
//         setDadosUmidade(agrupadasUmid);
        
//         if (ultimasLeituras.length > 0) {
//           const ultimaLeitura = ultimasLeituras[ultimasLeituras.length - 1];
//           setTemperatura(ultimaLeitura.temperatura);
//           setUmidade(ultimaLeitura.umidade);
//           setNome(ultimaLeitura.nomeSensor);
//         }
//       }
//     });

//     return () => unsubscribe();
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
//                 <Image source={Config} style={[styles.config, { width: 24, height: 24 }]} resizeMode="contain" />
//               </TouchableOpacity>
//             </View>

//             <View style={styles.cardGroup}>
//               <View style={styles.card}>
//                 <Text style={{ fontSize: 16 }}>
//                   <Text style={{ fontWeight: 'bold' }}>Temperatura: </Text>
//                   {temperatura || '---'} °C
//                 </Text>
//                 <VictoryChart 
//                   theme={VictoryTheme.material}
//                   domainPadding={20}
//                 >
//                   <VictoryAxis
//                     fixLabelOverlap
//                     style={{
//                       tickLabels: { 
//                         angle: -45, 
//                         textAnchor: 'end',
//                         fontSize: 8 
//                       }
//                     }}
//                   />
//                   <VictoryAxis dependentAxis />
//                   <VictoryLine 
//                     data={dadosTemperatura} 
//                     style={{ 
//                       data: { stroke: 'tomato', strokeWidth: 2 } 
//                     }} 
//                   />
//                 </VictoryChart>
//               </View>

//               <View style={styles.card}>
//                 <Text style={{ fontSize: 16 }}>
//                   <Text style={{ fontWeight: 'bold' }}>Umidade: </Text>
//                   {umidade || '---'} %
//                 </Text>
//                 <VictoryChart 
//                   theme={VictoryTheme.material}
//                   domainPadding={20}
//                 >
//                   <VictoryAxis
//                     fixLabelOverlap
//                     style={{
//                       tickLabels: { 
//                         angle: -45, 
//                         textAnchor: 'end',
//                         fontSize: 8 
//                       }
//                     }}
//                   />
//                   <VictoryAxis dependentAxis />
//                   <VictoryLine 
//                     data={dadosUmidade} 
//                     style={{ 
//                       data: { stroke: 'teal', strokeWidth: 2 } 
//                     }} 
//                   />
//                 </VictoryChart>
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
//     marginVertical: 10,
//     textAlign: 'center',
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
//   label: {
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   value: {
//     fontWeight: 'normal',
//   },
// });



// import { getDatabase, ref, onValue } from 'firebase/database';
// import { app } from './database/firebaseConfig';
// import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
// import React, { useEffect, useState, useRef } from 'react';
// import { useRouter } from 'expo-router';
// import Logo from '../assets/img/Logo.svg';
// import Config from '../assets/img/Configuracoes.svg';
// import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis } from 'victory';

// const Teste = ({ hasSensor = true }) => {
//   const router = useRouter();
//   const [leituras, setLeituras] = useState([]);
//   const [nome, setNome] = useState('');
//   const [temperatura, setTemperatura] = useState('');
//   const [umidade, setUmidade] = useState('');
//   const [bombaStatus, setBombaStatus] = useState('');
//   const [dadosTemperatura, setDadosTemperatura] = useState([]);
//   const [dadosUmidade, setDadosUmidade] = useState([]);

//   // Função para formatar timestamp para horário de Brasília
//   const formatarTimestamp = (ts) => {
//     if (!ts || ts.length < 14) return '';
    
//     const ano = parseInt(ts.slice(0, 4));
//     const mes = parseInt(ts.slice(4, 6)) - 1;
//     const dia = parseInt(ts.slice(6, 8));
//     const hora = parseInt(ts.slice(8, 10));
//     const minuto = parseInt(ts.slice(10, 12));
//     const segundo = parseInt(ts.slice(12, 14));

//     const dataUTC = new Date(Date.UTC(ano, mes, dia, hora, minuto, segundo));
//     const dataBrasilia = new Date(dataUTC.getTime() - 3 * 60 * 60 * 1000);

//     return dataBrasilia.toLocaleString('pt-BR', {
//       timeZone: 'America/Sao_Paulo',
//       hour12: false,
//     });
//   };

//   // Carrega dados do Firebase
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
//             const horaChave = timestamp.slice(0, 10);

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
        
//         // Atualiza os dados para os gráficos
//         const agrupadasTemp = ordenadas.map((leitura) => ({
//           x: formatarTimestamp(leitura.timestamp),
//           y: leitura.temperatura,
//         }));

//         const agrupadasUmid = ordenadas.map((leitura) => ({
//           x: formatarTimestamp(leitura.timestamp),
//           y: leitura.umidade,
//         }));

//         setDadosTemperatura(agrupadasTemp);
//         setDadosUmidade(agrupadasUmid);
        
//         // Atualiza os valores mais recentes
//         if (ordenadas.length > 0) {
//           const ultimaLeitura = ordenadas[0];
//           setTemperatura(ultimaLeitura.temperatura);
//           setUmidade(ultimaLeitura.umidade);
//           setNome(ultimaLeitura.nomeSensor);
//         }
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <ScrollView style={styles.scrollContent}>
//         {hasSensor ? (
//           <>
//             <View style={styles.cabecalho}>
//               <Image source={Logo} style={styles.img} />
//               <Text style={styles.title}>{nome || 'Sensor conectado'}</Text>
//               <TouchableOpacity
//                 onPress={() => router.push('/sensor')}
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
// {/* histórico de registros de temperatura */}
//             {/* <Text style={styles.title}>Histórico de Leituras</Text>
//             {leituras.map((leitura, index) => (
//               <View key={index} style={styles.card}>
//                 <Text style={styles.label}>Sensor: <Text style={styles.value}>{leitura.nomeSensor}</Text></Text>
//                 <Text style={styles.label}>Temperatura: <Text style={styles.value}>{leitura.temperatura} °C</Text></Text>
//                 <Text style={styles.label}>Umidade: <Text style={styles.value}>{leitura.umidade} %</Text></Text>
//                 <Text style={styles.label}>Horário: <Text style={styles.value}>{formatarTimestamp(leitura.timestamp)}</Text></Text>
//               </View>
//             ))} */}
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
// export default Teste;
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
//     marginVertical: 10,
//     textAlign: 'center',
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
//   label: {
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   value: {
//     fontWeight: 'normal',
//   },
// });






// // import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
// // import React, { useEffect, useState, useRef } from 'react';
// // import { useRouter } from 'expo-router';
// // import Logo from '../assets/img/Logo.svg';
// // import Config from '../assets/img/Configuracoes.svg';
// // import mqtt from 'mqtt';
// // import { Buffer } from 'buffer';
// // import { decode, encode } from 'base-64';
// // import { TextEncoder, TextDecoder } from 'text-encoding';
// // import { addLeitura, getLeituras, limparBancoDeDados } from './database/database';
// // import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis } from 'victory';

// // global.Buffer = Buffer;
// // global.atob = decode;
// // global.btoa = encode;
// // global.TextEncoder = TextEncoder;
// // global.TextDecoder = TextDecoder;

// // const Home = ({ hasSensor = true }) => {
// //   const router = useRouter();

// //   const [nome, setNome] = useState('');
// //   const [temperatura, setTemperatura] = useState('');
// //   const [umidade, setUmidade] = useState('');
// //   const [bombaStatus, setBombaStatus] = useState('');

// //   const [dadosTemperatura, setDadosTemperatura] = useState([]);
// //   const [dadosUmidade, setDadosUmidade] = useState([]);

// //   const [client, setClient] = useState(null);
// //   const [isConnected, setIsConnected] = useState(false);

// //   const jaSalvouManha = useRef(false);
// //   const jaSalvouTarde = useRef(false);

// //   useEffect(() => {
// //     const mqttClient = mqtt.connect('wss://broker.hivemq.com:8884/mqtt');

// //     mqttClient.on('connect', () => {
// //       setIsConnected(true);
// //       mqttClient.subscribe('sensor/nome');
// //       mqttClient.subscribe('sensor/temperatura');
// //       mqttClient.subscribe('sensor/umidade');
// //       mqttClient.subscribe('bomba/status');
// //     });

// //     mqttClient.on('message', async (topic, message) => {
// //       const payload = message.toString();

// //       if (topic === 'sensor/nome') setNome(payload);
// //       if (topic === 'sensor/temperatura') {
// //         setTemperatura(payload);
// //       }
// //       if (topic === 'sensor/umidade') {
// //         setUmidade(payload);
// //       }
// //       if (topic === 'bomba/status') setBombaStatus(payload);

// //       const temp = parseFloat(payload);
// //       const umid = parseFloat(payload);

// //       if (!isNaN(temp) && !isNaN(umid)) {
// //         const agora = new Date();
// //         const hora = agora.getHours();
// //         const periodo = hora < 12 ? 'Manhã' : 'Tarde';

// //         if (
// //   temperatura &&
// //   umidade &&
// //   !jaSalvouManha.current &&
// //   !jaSalvouTarde.current
// // ) {
// //   const hora = new Date().getHours();
// //   const periodo = hora < 12 ? 'Manhã' : 'Tarde';
// //   const ref = periodo === 'Manhã' ? jaSalvouManha : jaSalvouTarde;

// //   if (!ref.current) {
// //     addLeitura({
// //       idSensor: 1,
// //       temperatura: parseFloat(temperatura),
// //       umidade: parseFloat(umidade),
// //     });
// //     ref.current = true;
// //   }
// // }}
// //     });

// //     setClient(mqttClient);
// //     return () => mqttClient.end();
// //   }, [umidade]);

// //   useEffect(() => {
// //     async function carregarDados() {
// //       const leituras = await getLeituras();

// //       const agrupadasTemp = leituras.map((leitura) => ({
// //       x: `${leitura.data} ${leitura.periodo}`,
// //       y: leitura.temperatura,
// //     }));
// //       const agrupadasUmid = leituras.map((leitura) => ({
// //       x: `${leitura.data} ${leitura.periodo}`,
// //       y: leitura.umidade,
// //     }));

// //       setDadosTemperatura(agrupadasTemp);
// //     setDadosUmidade(agrupadasUmid);
// //     }

// //     carregarDados();
// //   }, []);

// //   return (
// //     <View style={styles.container}>
// //       <ScrollView style={styles.scrollContent}>
// //         {hasSensor ? (
// //           <>
// //             <View style={styles.cabecalho}>
// //               <Image source={Logo} style={styles.img} />
// //               <Text style={styles.title}>{nome || 'Sensor conectado'}</Text>
// //               <TouchableOpacity onPress={() => router.push('/sensor')}>
// //                  <Image source={Config} style={[styles.config, { width: 24, height: 24 }]} resizeMode="contain" />
// //                </TouchableOpacity>
// //             </View>

// //             <View style={styles.cardGroup}>
// //               <View style={styles.card}>
// //                 <Text style={{ fontSize: 16 }}>
// //                   <Text style={{ fontWeight: 'bold' }}>Temperatura: </Text>
// //                   {temperatura || '---'} °C
// //                 </Text>
// //                 <VictoryChart theme={VictoryTheme.material}>
// //                   <VictoryAxis fixLabelOverlap />
// //                   <VictoryAxis dependentAxis />
// //                   <VictoryLine data={dadosTemperatura} style={{ data: { stroke: 'tomato' } }} />
// //                 </VictoryChart>
// //               </View>

// //               <View style={styles.card}>
// //                   <Text style={{ fontSize: 16 }}>
// //     <Text style={{ fontWeight: 'bold' }}>Umidade: </Text>
// //     {umidade || '---'} %
// //   </Text>
// //   <VictoryChart theme={VictoryTheme.material}>
// //     <VictoryAxis fixLabelOverlap />
// //     <VictoryAxis dependentAxis />
// //     <VictoryLine data={dadosUmidade} style={{ data: { stroke: 'teal' } }} />
// //   </VictoryChart>
// //               </View>

// //               <View style={styles.card}>
// //                 <Text style={{ fontSize: 16 }}>
// //                   <Text style={{ fontWeight: 'bold' }}>Status da Bomba: </Text>
// //                   {bombaStatus || '---'}
// //                 </Text>
// //               </View>
// //             </View>
// //           </>
// //         ) : (
// //           <View>
// //             <Text style={styles.title}>Nenhum sensor foi adicionado</Text>
// //           </View>
// //         )}
// //       </ScrollView>

// //       <View style={styles.rodape}>
// //         <TouchableOpacity style={styles.btn} onPress={() => router.push('/adicionar')}>
// //           <Text style={styles.btnText}>Adicionar</Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity style={styles.btn} onPress={() => router.push('/ajuda')}>
// //           <Text style={styles.btnText}>Ajuda</Text>
// //         </TouchableOpacity>
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
// //   textoNullo: {
// //     textAlign: 'center',
// //     padding: 10,
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //   },
// //   config: {
// //     cursor: 'pointer',
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
// //     marginBottom: 50,
// //   },
// //   cardGroup: {
// //     flexDirection: 'column',
// //     padding: 10,
// //   },
// //   card: {
// //     backgroundColor: '#C0F7A2',
// //     padding: 20,
// //     borderRadius: 5,
// //     marginVertical: 10,
// //     width: '90%',
// //     alignSelf: 'center',
// //   },
// //   btn: {
// //     width: 100,
// //     height: 30,
// //     backgroundColor: '#ffffff',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     borderRadius: 100,
// //   },
// //   btnText: {
// //     color: '#2E5939',
// //     fontWeight: 'bold',
// //   },
// // });
