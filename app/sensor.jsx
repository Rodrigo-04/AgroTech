// // import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
// // import React, { useState, useEffect } from 'react';
// // import Logo from '../assets/img/Logo.svg';
// // import { useLocalSearchParams, useRouter } from 'expo-router';
// // import ConfirmModal from './modal';
// // import Voltar from '../assets/img/Voltar.png';
// // import { Picker } from '@react-native-picker/picker';
// // import { salvarSensor } from './database/database';

// // const Sensor = () => {
// //   const { dados, config } = useLocalSearchParams();
// //   const leituras = JSON.parse(dados || '[]');
// //   const sensorConfig = JSON.parse(config || '{}');
// //   const router = useRouter();

// //   const [modalVisible, setModalVisible] = useState(false);
// //   const [modalData, setModalData] = useState({
// //     title: '',
// //     message: '',
// //     onConfirm: () => {},
// //   });

// //   const [idSensor, setIdSensor] = useState(sensorConfig?.idSensor || 1);
// //   const [textNome, setTextNome] = useState(sensorConfig?.nome || 'Sensor Conectado');
// //   const [planta, setPlanta] = useState(sensorConfig?.planta ?? '');
// //   const [irrigacao, setIrrigacao] = useState(sensorConfig?.irrigacao ?? 0);
// //   const [intervalo, setIntervalo] = useState(sensorConfig?.intervalo ?? 0);
// //   const [tempo, setTempo] = useState(sensorConfig?.tempo ?? 0);
// //   const [intervalosDisponiveis, setIntervalosDisponiveis] = useState([]);

// //   // Listas de opções
// //   const plantas = [
// //   "Abacaxi", "Abacate", "Açaí", "Alface", "Alho",
// //   "Algodão", "Almeirão", "Amendoim", "Arroz", "Aveia",
// //   "Banana", "Batata-doce", "Batata inglesa", "Berinjela", "Beterraba",
// //   "Brócolis", "Cacau", "Café arábica", "Café robusta", "Cana-de-açúcar",
// //   "Cará", "Cebola", "Cebolinha", "Cenoura", "Chicória",
// //   "Chuchu", "Coco-da-baía", "Coentro", "Couve", "Couve-flor",
// //   "Ervilha", "Espinafre", "Feijão carioca", "Feijão preto", "Feijão-fradinho",
// //   "Figo", "Gergelim", "Goiaba", "Graviola", "Guaraná",
// //   "Inhame", "Jabuticaba", "Jaca", "Jiló", "Laranja-pera",
// //   "Laranja-lima", "Lentilha", "Limão-taiti", "Limão-siciliano", "Linhaça",
// //   "Maçã fuji", "Maçã gala", "Mamão formosa", "Mamão papaia", "Mandioca",
// //   "Manga palmer", "Manga tommy", "Manjericão", "Maracujá", "Melancia",
// //   "Melão amarelo", "Milho verde", "Milho de pipoca", "Morango", "Mostarda",
// //   "Nabo", "Nectarina", "Noz-pecã", "Óleo de palma (dendê)", "Orégano",
// //   "Palmito pupunha", "Papo-de-peru", "Pequi", "Pepino", "Pera",
// //   "Pêssego", "Pimentão verde", "Pimentão vermelho", "Pimenta-do-reino", "Pimenta dedo-de-moça",
// //   "Pinhão", "Pistache", "Quiabo", "Rabanete", "Repolho",
// //   "Rúcula", "Salsa", "Soja", "Sorgo", "Taioba",
// //   "Tangerina ponkan", "Tomate rasteiro", "Tomate italiano", "Tomate cereja", "Trigo",
// //   "Uva niágara", "Uva rubi", "Uva Itália", "Vagem"
// // ];

// //   const irrigacoes = ["nenhuma", "temperatura", "intervalo de tempo"];
// //   const tempos = ["nenhum", "10s", "30s", "1min", "2min"];
// //   const intervalosTemperatura = ["nenhum", "maior que 14ºC", "maior que 20ºC", "maior que 27ºC"]
// //   const intervalosTempo = ["nenhum", "1h", "2h", "4h", "6h", "12h", "24h"]

// //   // Configurações de irrigação
// //   const configIrrigacao = {
// //     modos: {
// //       nenhuma: { intervalos: ["nenhum"] },
// //       temperatura: { intervalos: ["nenhum", "maior que 14ºC", "maior que 20ºC", "maior que 27ºC"] },
// //       "intervalo de tempo": { intervalos: ["nenhum", "1h", "2h", "4h", "6h", "12h", "24h"] }
// //     }
// //   };

// //   // Atualiza os intervalos disponíveis quando o tipo de irrigação muda
// //   useEffect(() => {
// //     const tipoIrrigacao = irrigacoes[irrigacao] || "nenhuma";
// //     const novosIntervalos = configIrrigacao.modos[tipoIrrigacao].intervalos;
// //     setIntervalosDisponiveis(novosIntervalos);
    
// //     // Reseta o intervalo selecionado quando o tipo muda
// //     setIntervalo(0);
// //   }, [irrigacao]);

// //   const abrirModal = (title, message, onConfirm) => {
// //     setModalData({ title, message, onConfirm });
// //     setModalVisible(true);
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.cabecalho}>
// //         <Image source={Logo} style={styles.img} />
// //         <Text style={styles.title}>Configurar</Text>
// //         <TouchableOpacity onPress={() => router.push('/home')}>
// //           <Image source={Voltar} style={{ width: 24, height: 24 }} resizeMode="contain" />
// //         </TouchableOpacity>
// //       </View>

// //       <ScrollView style={styles.scrollContent}>
// //         <View style={styles.cardGroup}>
          
// //           <View style={styles.card}>
// //             <Text style={styles.cardTitle}>Controles:</Text>
// //             <View>
// //               <Text style={styles.label}>Planta:</Text>
// //               <Picker
// //                 selectedValue={planta}
// //                 onValueChange={setPlanta}
// //                 style={styles.picker}
// //               >
// //                 <Picker.Item label="Selecione uma planta" value="" />
// //                 {plantas.map((planta, index) => (
// //                   <Picker.Item key={index} label={planta} value={planta} />
// //                 ))}
// //               </Picker>
// //             </View>
// //             <View>
// //               <Text style={styles.label}>Tipo de Irrigação:</Text>
// //               <Picker
// //                 selectedValue={irrigacao}
// //                 onValueChange={(itemValue) => setIrrigacao(Number(itemValue))}
// //                 style={styles.picker}
// //               >
// //                 {irrigacoes.map((item, index) => (
// //                   <Picker.Item key={index} label={item} value={index} />
// //                 ))}
// //               </Picker>
// //             </View>

// //             <View>
// //               <Text style={styles.label}>Intervalo:</Text>
// //               <Picker
// //                 selectedValue={intervalo}
// //                 onValueChange={(itemValue) => setIntervalo(Number(itemValue))}
// //                 style={styles.picker}
// //                 enabled={intervalosDisponiveis.length > 0}
// //               >
// //                 {intervalosDisponiveis.map((item, index) => (
// //                   <Picker.Item key={index} label={item} value={index} />
// //                 ))}
// //               </Picker>
// //             </View>

// //             <View>
// //               <Text style={styles.label}>Duração:</Text>
// //               <Picker
// //                 selectedValue={tempo}
// //                 onValueChange={(itemValue) => setTempo(Number(itemValue))}
// //                 style={styles.picker}
// //               >
// //                 {tempos.map((item, index) => (
// //                   <Picker.Item key={index} label={item} value={index} />
// //                 ))}
// //               </Picker>
// //             </View>
// //           </View>
// //         </View>
// //       </ScrollView>

// //       <ConfirmModal
// //         visible={modalVisible}
// //         title={modalData.title}
// //         message={modalData.message}
// //         onConfirm={modalData.onConfirm}
// //         onCancel={() => {
// //           setModalVisible(false);
// //           router.push('/sensor');
// //         }}
// //         confirmText="Sim"
// //         cancelText="Não"
// //       />

// //       <View style={styles.rodape}>
// //         <TouchableOpacity
// //           style={styles.btn}
// //           onPress={() =>
// //             abrirModal('Confirmar exclusão', 'Tem certeza que deseja excluir este sensor?', () => {
// //               Alert.alert('Sensor excluído com sucesso!');
// //               setModalVisible(false);
// //             })
// //           }
// //         >
// //           <Text style={styles.btnText}>Excluir</Text>
// //         </TouchableOpacity>

// //         <TouchableOpacity
// //           style={styles.btn}
// //           onPress={() =>
// //             abrirModal('Iniciar irrigação', 'Deseja iniciar a irrigação?', () => {
// //               Alert.alert('Irrigação iniciada!');
// //               setModalVisible(false);
// //             })
// //           }
// //         >
// //           <Text style={styles.btnText}>Irrigar</Text>
// //         </TouchableOpacity>

// //         <TouchableOpacity
// //           style={styles.btn}
// //           onPress={() =>
// //             abrirModal('Salvar alterações', 'Deseja salvar as alterações feitas?', async () => {
// //               await salvarSensor({
// //                 idSensor,
// //                 nome: textNome,
// //                 planta,
// //                 irrigacao,
// //                 intervalo,
// //                 tempo,
// //               });
// //               Alert.alert('Alterações salvas com sucesso!');
// //               setModalVisible(false);
// //             })
// //           }
// //         >
// //           <Text style={styles.btnText}>Salvar</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </View>
// //   );
// // };

// // export default Sensor;
// //  const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#ECFFD4',
// //   },
// //   cabecalho: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-around',
// //     alignItems: 'center',
// //     width: '100%',
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
// //   info: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginVertical: 4,
// //   },
// //   input: {
// //     borderWidth: 1,
// //     borderColor: '#aaa',
// //     borderRadius: 4,
// //     padding: 6,
// //     marginLeft: 5,
// //     flex: 1,
// //   },
// //   pickerContainer: {
// //   flex: 1,
// //   borderWidth: 1,
// //   borderColor: '#aaa',
// //   borderRadius: 4,
// //   marginLeft: 5,
// // },
// // picker: {
// //   height: 40,
// //   width: '100%',
// // },
// //   scrollContent: {
// //     flex: 1,
// //     marginBottom: 50,
// //   },
// //   cardGroup: {
// //     flexDirection: 'row',
// //     flexWrap: 'wrap',
// //     justifyContent: 'center',
// //   },
// //   cardTitle: {
// //     fontSize: '16px',
// //     fontWeight: 'bold',
// //     alignSelf: 'center'
// //   },
// //   card: {
// //     backgroundColor: '#ffffff',
// //     borderWidth: 1,
// //     borderColor: '#000000',
// //     padding: 20,
// //     borderRadius: 5,
// //     margin: 20,
// //     width: 300,
// //   },
// //   rodape: {
// //     flexDirection: 'row',
// //     width: '100%',
// //     height: 50,
// //     alignItems: 'center',
// //     justifyContent: 'space-around',
// //     backgroundColor: '#2E5939',
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
// //   label:{
// //     marginTop: '20px'
// //   }
// // });



// // import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
// // import React, { useState } from 'react';
// // import Logo from '../assets/img/Logo.svg';
// // import { useLocalSearchParams, useRouter } from 'expo-router';
// // import ConfirmModal from './modal';
// // import Voltar from '../assets/img/Voltar.png';
// // import { Picker } from '@react-native-picker/picker';
// // import { getDatabase, ref, onValue } from 'firebase/database';
// // import { app } from './database/firebaseConfig';

// // const Sensor = () => {
// //   const { dados, config } = useLocalSearchParams();
// //   const leituras = JSON.parse(dados || '[]');
// //   const sensorConfig = JSON.parse(config || '{}');
// //   const router = useRouter();

// // const [loading, setLoading] = useState(false);

// //   const [modalVisible, setModalVisible] = useState(false);
// //   const [modalData, setModalData] = useState({
// //     title: '',
// //     message: '',
// //     onConfirm: () => {},
// //   });

// //   // Estados para cada picker
// //   const [tipoIrrigacao, setTipoIrrigacao] = useState(sensorConfig?.tipoIrrigacao ?? 0);
// //   const [intervalo, setIntervalo] = useState(sensorConfig?.intervalo ?? 0);
// //   const [temperatura, setTemperatura] = useState(sensorConfig?.temperatura ?? 0);
// //   const [duracao, setDuracao] = useState(sensorConfig?.duracao ?? 0);

// //   // Opções para cada picker
// //   const tiposIrrigacao = ["nenhuma", "temperatura", "intervalo de tempo"];
// //   const intervalos = ["nenhum", "1h", "2h", "4h", "6h", "12h", "24h"];
// //   const temperaturas = ["nenhum", "maior que 14ºC", "maior que 20ºC", "maior que 27ºC"];
// //   const duracoes = ["nenhum", "10s", "30s", "1min", "2min"];

// //   const abrirModal = (title, message, onConfirm) => {
// //     setModalData({ title, message, onConfirm });
// //     setModalVisible(true);
// //   };

// //   const iniciarIrrigacao = async () => {
// //   try {
// //     await update(raimundkRef, {
// //       ativarBombaTemperatura: 1
// //     });
// //     Alert.alert('Sucesso', 'Irrigação iniciada com sucesso!');
// //     return true;
// //   } catch (error) {
// //     Alert.alert('Erro', 'Falha ao iniciar irrigação');
// //     console.error("Erro ao iniciar irrigação:", error);
// //     return false;
// //   }
// // };

// // // Função para limpar dados (setar tudo como 0 ou "")
// // const limparDados = async () => {
// //   try {
// //     await update(raimundkRef, {
// //       ativarBombaTemperatura: 0,
// //       timerBomba: 0,
// //       user_passwd: ""
// //     });
// //     Alert.alert('Sucesso', 'Dados limpos com sucesso!');
// //     return true;
// //   } catch (error) {
// //     Alert.alert('Erro', 'Falha ao limpar dados');
// //     console.error("Erro ao limpar dados:", error);
// //     return false;
// //   }
// // };

// // // Função para salvar configurações
// // const salvarConfiguracoes = async (dados) => {
// //   try {
// //     // Converte string vazia para 0 quando for temperatura
// //     const temperatura = dados.temperatura === "" ? 0 : dados.temperatura;
    
// //     await update(raimundkRef, {
// //       timerBomba: dados.tempo || 0,
// //       ativarBombaTemperatura: temperatura
// //       // Adicione outros campos conforme necessário
// //     });
// //     Alert.alert('Sucesso', 'Configurações salvas com sucesso!');
// //     return true;
// //   } catch (error) {
// //     Alert.alert('Erro', 'Falha ao salvar configurações');
// //     console.error("Erro ao salvar configurações:", error);
// //     return false;
// //   }
// // };

// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.cabecalho}>
// //         <Image source={Logo} style={styles.img} />
// //         <Text style={styles.title}>Configurações de Irrigação</Text>
// //         <TouchableOpacity onPress={() => router.push('/home')}>
// //           <Image source={Voltar} style={{ width: 24, height: 24 }} resizeMode="contain" />
// //         </TouchableOpacity>
// //       </View>

// //       <ScrollView style={styles.scrollContent}>
// //         <View style={styles.cardGroup}>
// //           <View style={styles.card}>
// //             <Text style={styles.cardTitle}>Configurações da Bomba</Text>
            
// //             {/* Picker 1: Tipo de Irrigação */}
// //             <View>
// //               <Text style={styles.label}>Tipo de Irrigação:</Text>
// //               <Picker
// //                 selectedValue={tipoIrrigacao}
// //                 onValueChange={(itemValue) => setTipoIrrigacao(itemValue)}
// //                 style={styles.picker}
// //               >
// //                 {tiposIrrigacao.map((item, index) => (
// //                   <Picker.Item key={index} label={item} value={index} />
// //                 ))}
// //               </Picker>
// //             </View>

// //             {/* Picker 2: Intervalo */}
// //             <View>
// //               <Text style={styles.label}>Intervalo:</Text>
// //               <Picker
// //                 selectedValue={intervalo}
// //                 onValueChange={(itemValue) => setIntervalo(itemValue)}
// //                 style={styles.picker}
// //               >
// //                 {intervalos.map((item, index) => (
// //                   <Picker.Item key={index} label={item} value={index} />
// //                 ))}
// //               </Picker>
// //             </View>

// //             {/* Picker 3: Temperatura */}
// //             <View>
// //               <Text style={styles.label}>Temperatura:</Text>
// //               <Picker
// //                 selectedValue={temperatura}
// //                 onValueChange={(itemValue) => setTemperatura(itemValue)}
// //                 style={styles.picker}
// //               >
// //                 {temperaturas.map((item, index) => (
// //                   <Picker.Item key={index} label={item} value={index} />
// //                 ))}
// //               </Picker>
// //             </View>

// //             {/* Picker 4: Duração */}
// //             <View>
// //               <Text style={styles.label}>Duração:</Text>
// //               <Picker
// //                 selectedValue={duracao}
// //                 onValueChange={(itemValue) => setDuracao(itemValue)}
// //                 style={styles.picker}
// //               >
// //                 {duracoes.map((item, index) => (
// //                   <Picker.Item key={index} label={item} value={index} />
// //                 ))}
// //               </Picker>
// //             </View>
// //           </View>
// //         </View>
// //       </ScrollView>

// //       <ConfirmModal
// //         visible={modalVisible}
// //         title={modalData.title}
// //         message={modalData.message}
// //         onConfirm={modalData.onConfirm}
// //         onCancel={() => setModalVisible(false)}
// //         confirmText="Sim"
// //         cancelText="Não"
// //       />

// //       <View style={styles.rodape}>
// //         <TouchableOpacity
// //           style={styles.btn}
// //           onPress={() =>
// //             abrirModal('Limpar dados', 'Tem certeza que deseja limpar os campos?', async () => {
// //               await limparDados();
// //               setModalVisible(false);
// //             })
// //           }
// //         >
// //           <Text style={styles.btnText}>Limpar</Text>
// //         </TouchableOpacity>

// //         <TouchableOpacity
// //           style={styles.btn}
// //           onPress={() =>
// //             abrirModal('Iniciar irrigação', 'Deseja iniciar a irrigação?', async () => {
// //               await iniciarIrrigacao();
// //               setModalVisible(false);
// //             })
// //           }
// //         >
// //           <Text style={styles.btnText}>Irrigar</Text>
// //         </TouchableOpacity>

// //         <TouchableOpacity
// //           style={styles.btn}
// //           onPress={() =>
// //             abrirModal('Salvar alterações', 'Deseja salvar as alterações feitas?', async () => {
// //               await salvarConfiguracoes({
// //                 tempo: intervalo,  // assumindo que 'intervalo' é o tempo em segundos
// //                 temperatura: irrigacao // assumindo que 'irrigacao' é o valor de temperatura
// //               });
// //               setModalVisible(false);
// //             })
// //           }
// //         >
// //           <Text style={styles.btnText}>Salvar</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#ECFFD4',
// //   },
// //   cabecalho: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-around',
// //     alignItems: 'center',
// //     width: '100%',
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
// //   info: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginVertical: 4,
// //   },
// //   input: {
// //     borderWidth: 1,
// //     borderColor: '#aaa',
// //     borderRadius: 4,
// //     padding: 6,
// //     marginLeft: 5,
// //     flex: 1,
// //   },
// //   pickerContainer: {
// //   flex: 1,
// //   borderWidth: 1,
// //   borderColor: '#aaa',
// //   borderRadius: 4,
// //   marginLeft: 5,
// // },
// // picker: {
// //   height: 40,
// //   width: '100%',
// // },
// //   scrollContent: {
// //     flex: 1,
// //     marginBottom: 50,
// //   },
// //   cardGroup: {
// //     flexDirection: 'row',
// //     flexWrap: 'wrap',
// //     justifyContent: 'center',
// //   },
// //   cardTitle: {
// //     fontSize: '16px',
// //     fontWeight: 'bold',
// //     alignSelf: 'center'
// //   },
// //   card: {
// //     backgroundColor: '#ffffff',
// //     borderWidth: 1,
// //     borderColor: '#000000',
// //     padding: 20,
// //     borderRadius: 5,
// //     margin: 20,
// //     width: 300,
// //   },
// //   rodape: {
// //     flexDirection: 'row',
// //     width: '100%',
// //     height: 50,
// //     alignItems: 'center',
// //     justifyContent: 'space-around',
// //     backgroundColor: '#2E5939',
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
// //   label:{
// //     marginTop: '20px'
// //   }
// // });

// // export default Sensor;



// import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import Logo from '../assets/img/Logo.svg';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import ConfirmModal from './modal';
// import Voltar from '../assets/img/Voltar.png';
// import { Picker } from '@react-native-picker/picker';
// import { getDatabase, ref, onValue, update } from 'firebase/database';
// import { app } from './database/firebaseConfig';

// const Sensor = () => {
//   const { dados, config } = useLocalSearchParams();
//   const leituras = JSON.parse(dados || '[]');
//   const sensorConfig = JSON.parse(config || '{}');
//   const router = useRouter();

//   // Inicializa o Firebase
//   const db = getDatabase(app);
//   const configRef = ref(db, 'config/user');

//   const [loading, setLoading] = useState(true);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalData, setModalData] = useState({
//     title: '',
//     message: '',
//     onConfirm: () => {},
//   });

//   // Estados para cada picker
//   const [tipoIrrigacao, setTipoIrrigacao] = useState(0);
//   const [intervalo, setIntervalo] = useState(0);
//   const [temperatura, setTemperatura] = useState(0);
//   const [duracao, setDuracao] = useState(0);

//   // Opções para cada picker
//   const tiposIrrigacao = ["nenhuma", "temperatura", "intervalo de tempo"];
//   const intervalos = ["nenhum", "1h", "2h", "4h", "6h", "12h", "24h"];
//   const temperaturas = ["nenhum", "maior que 14ºC", "maior que 20ºC", "maior que 27ºC"];
//   const duracoes = ["nenhum", "10s", "30s", "1min", "2min"];

//   // Carregar configurações do Firebase
//   useEffect(() => {
//     const fetchConfig = () => {
//       onValue(configRef, (snapshot) => {
//         const data = snapshot.val();
//         if (data) {
//           setTipoIrrigacao(data.TipoIrrigacao || 0);
//           setIntervalo(data.Intervalo || 0);
//           setTemperatura(data.Temperatura || 0);
//           setDuracao(data.Duracao || 0);
//         }
//         setLoading(false);
//       }, (error) => {
//         console.error("Erro ao carregar configurações:", error);
//         setLoading(false);
//       });
//     };

//     fetchConfig();
//   }, []);

//   const abrirModal = (title, message, onConfirm) => {
//     setModalData({ title, message, onConfirm });
//     setModalVisible(true);
//   };

//   // Funções de mapeamento para valores do banco de dados
//   const mapTipoIrrigacaoToValue = (index) => {
//     // 1 = Temperatura, 2 = Intervalo
//     return index === 0 ? 0 : (index === 1 ? 1 : 2);
//   };

//   const mapIntervaloToValue = (index) => {
//     const intervalosMs = [0, 3600000, 7200000, 14400000, 21600000, 43200000, 86400000];
//     return intervalosMs[index] || 0;
//   };

//   const mapTemperaturaToValue = (index) => {
//     const temperaturasValores = ["0", "14", "20", "27"];
//     return temperaturasValores[index] || "0";
//   };

//   const mapDuracaoToValue = (index) => {
//     const duracoesMs = [0, 10000, 30000, 60000, 120000];
//     return duracoesMs[index] || 0;
//   };

//   const iniciarIrrigacao = async () => {
//     try {
//       setLoading(true);
//       await update(configRef, {
//         ativarBomba: 1
//       });
//       Alert.alert('Sucesso', 'Irrigação iniciada com sucesso!');
//       return true;
//     } catch (error) {
//       Alert.alert('Erro', 'Falha ao iniciar irrigação');
//       console.error("Erro ao iniciar irrigação:", error);
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const limparDados = async () => {
//     try {
//       setLoading(true);
//       await update(configRef, {
//         TipoIrrigacao: 0,
//         Intervalo: 0,
//         Temperatura: 0,
//         Duracao: 0,
//         ativarBomba: 0
//       });
      
//       // Atualizar estado local
//       setTipoIrrigacao(0);
//       setIntervalo(0);
//       setTemperatura(0);
//       setDuracao(0);
      
//       Alert.alert('Sucesso', 'Dados limpos com sucesso!');
//       return true;
//     } catch (error) {
//       Alert.alert('Erro', 'Falha ao limpar dados');
//       console.error("Erro ao limpar dados:", error);
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const salvarConfiguracoes = async () => {
//     try {
//       setLoading(true);
      
//       const configData = {
//         TipoIrrigacao: mapTipoIrrigacaoToValue(tipoIrrigacao),
//         Intervalo: mapIntervaloToValue(intervalo),
//         Temperatura: mapTemperaturaToValue(temperatura),
//         Duracao: mapDuracaoToValue(duracao),
//         ativarBomba: 0
//       };

//       await update(configRef, configData);
      
//       Alert.alert('Sucesso', 'Configurações salvas com sucesso!');
//       return true;
//     } catch (error) {
//       Alert.alert('Erro', 'Falha ao salvar configurações');
//       console.error("Erro ao salvar configurações:", error);
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {loading && (
//         <View style={styles.loadingOverlay}>
//           <ActivityIndicator size="large" color="#2E5939" />
//         </View>
//       )}
      
//       <View style={styles.cabecalho}>
//         <Image source={Logo} style={styles.img} />
//         <Text style={styles.title}>Configurações de Irrigação</Text>
//         <TouchableOpacity onPress={() => router.push('/home')}>
//           <Image source={Voltar} style={{ width: 24, height: 24 }} resizeMode="contain" />
//         </TouchableOpacity>
//       </View>

//       <ScrollView style={styles.scrollContent}>
//         <View style={styles.cardGroup}>
//           <View style={styles.card}>
//             <Text style={styles.cardTitle}>Configurações da Bomba</Text>
            
//             {/* Picker 1: Tipo de Irrigação */}
//             <View>
//               <Text style={styles.label}>Tipo de Irrigação:</Text>
//               <Picker
//                 selectedValue={tipoIrrigacao}
//                 onValueChange={(itemValue) => setTipoIrrigacao(itemValue)}
//                 style={styles.picker}
//               >
//                 {tiposIrrigacao.map((item, index) => (
//                   <Picker.Item key={index} label={item} value={index} />
//                 ))}
//               </Picker>
//             </View>

//             {/* Picker 2: Intervalo */}
//             <View>
//               <Text style={styles.label}>Intervalo:</Text>
//               <Picker
//                 selectedValue={intervalo}
//                 onValueChange={(itemValue) => setIntervalo(itemValue)}
//                 style={styles.picker}
//               >
//                 {intervalos.map((item, index) => (
//                   <Picker.Item key={index} label={item} value={index} />
//                 ))}
//               </Picker>
//             </View>

//             {/* Picker 3: Temperatura */}
//             <View>
//               <Text style={styles.label}>Temperatura:</Text>
//               <Picker
//                 selectedValue={temperatura}
//                 onValueChange={(itemValue) => setTemperatura(itemValue)}
//                 style={styles.picker}
//               >
//                 {temperaturas.map((item, index) => (
//                   <Picker.Item key={index} label={item} value={index} />
//                 ))}
//               </Picker>
//             </View>

//             {/* Picker 4: Duração */}
//             <View>
//               <Text style={styles.label}>Duração:</Text>
//               <Picker
//                 selectedValue={duracao}
//                 onValueChange={(itemValue) => setDuracao(itemValue)}
//                 style={styles.picker}
//               >
//                 {duracoes.map((item, index) => (
//                   <Picker.Item key={index} label={item} value={index} />
//                 ))}
//               </Picker>
//             </View>
//           </View>
//         </View>
//       </ScrollView>

//       <ConfirmModal
//         visible={modalVisible}
//         title={modalData.title}
//         message={modalData.message}
//         onConfirm={modalData.onConfirm}
//         onCancel={() => setModalVisible(false)}
//         confirmText="Sim"
//         cancelText="Não"
//       />

//       <View style={styles.rodape}>
//         <TouchableOpacity
//           style={[styles.btn, loading && styles.disabledBtn]}
//           onPress={() =>
//             abrirModal('Limpar dados', 'Tem certeza que deseja limpar os campos?', async () => {
//               await limparDados();
//               setModalVisible(false);
//             })
//           }
//           disabled={loading}
//         >
//           <Text style={styles.btnText}>Limpar</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.btn, loading && styles.disabledBtn]}
//           onPress={() =>
//             abrirModal('Iniciar irrigação', 'Deseja iniciar a irrigação?', async () => {
//               await iniciarIrrigacao();
//               setModalVisible(false);
//             })
//           }
//           disabled={loading}
//         >
//           <Text style={styles.btnText}>Irrigar</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.btn, loading && styles.disabledBtn]}
//           onPress={() =>
//             abrirModal('Salvar alterações', 'Deseja salvar as alterações feitas?', async () => {
//               await salvarConfiguracoes();
//               setModalVisible(false);
//             })
//           }
//           disabled={loading}
//         >
//           <Text style={styles.btnText}>Salvar</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default Sensor;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ECFFD4',
//   },
//   cabecalho: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     width: '100%',
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
//   info: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 4,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#aaa',
//     borderRadius: 4,
//     padding: 6,
//     marginLeft: 5,
//     flex: 1,
//   },
//   pickerContainer: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#aaa',
//     borderRadius: 4,
//     marginLeft: 5,
//   },
//   picker: {
//     height: 40,
//     width: '100%',
//   },
//   scrollContent: {
//     flex: 1,
//     marginBottom: 50,
//   },
//   cardGroup: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//   },
//   cardTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     alignSelf: 'center'
//   },
//   card: {
//     backgroundColor: '#ffffff',
//     borderWidth: 1,
//     borderColor: '#000000',
//     padding: 20,
//     borderRadius: 5,
//     margin: 20,
//     width: 300,
//   },
//   rodape: {
//     flexDirection: 'row',
//     width: '100%',
//     height: 50,
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     backgroundColor: '#2E5939',
//   },
//   btn: {
//     height: 30,
//     backgroundColor: '#ffffff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 100,
//     width: 100
//   },
//   disabledBtn: {
//     backgroundColor: '#cccccc',
//   },
//   btnText: {
//     color: '#2E5939',
//     fontWeight: 'bold',
//   },
//   label: {
//     marginTop: 20
//   },
//   loadingOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 1000,
//   }
// });

import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from './database/firebaseConfig';
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, useWindowDimensions } from 'react-native';
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
  
  // Usando useWindowDimensions para obter o tamanho da tela
  const { width } = useWindowDimensions();
  const isLargeDevice = width >= 768;

  // Restante do seu código permanece igual...
  const formatarTimestamp = (ts) => { /* ... */ };
  const formatarData = (ts) => { /* ... */ };
  useEffect(() => { /* ... */ }, []);

  // Criando os estilos dinamicamente com base no tamanho da tela
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
      flexDirection: isLargeDevice ? 'row' : 'column',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      padding: 10,
      alignSelf: 'center',
      width: isLargeDevice ? '90%' : '100%',
    },
    card: {
      backgroundColor: '#C0F7A2',
      padding: 20,
      borderRadius: 5,
      marginVertical: 10,
      width: isLargeDevice ? '48%' : '90%',
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
    chartContainer: {
      height: 250,
    },
  });

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
                <View style={styles.chartContainer}>
                  <VictoryChart 
                    theme={VictoryTheme.material}
                    domainPadding={20}
                    width={isLargeDevice ? 350 : 300}
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
                <View style={styles.chartContainer}>
                  <VictoryChart 
                    theme={VictoryTheme.material}
                    domainPadding={20}
                    width={isLargeDevice ? 350 : 300}
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
            </View>
          </>
        ) : (
          <View>
            <Text style={styles.title}>Nenhum sensor foi adicionado</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.rodape}>
        <TouchableOpacity style={styles.btn} onPress={() => router.push('/ajuda')}>
          <Text style={styles.btnText}>Ajuda</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;