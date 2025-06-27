import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import Logo from '../assets/img/Logo.svg';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ConfirmModal from './modal';
import Voltar from '../assets/img/Voltar.png';
import { Picker } from '@react-native-picker/picker';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { app } from './database/firebaseConfig';

const Sensor = () => {
  const { dados, config } = useLocalSearchParams();
  const leituras = JSON.parse(dados || '[]');
  const router = useRouter();

  // Firebase setup
  const db = getDatabase(app);
  const configRef = ref(db, 'Raimundo/config');

  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({
    title: '',
    message: '',
    onConfirm: () => {},
  });

  // Estados para as configurações
  const [tipoIrrigacao, setTipoIrrigacao] = useState(0);
  const [intervalo, setIntervalo] = useState(10000);
  const [duracao, setDuracao] = useState(0);
  const [bombaStatus, setBombaStatus] = useState(0);

  // Opções para os pickers
  const tiposIrrigacao = ['nenhuma', 'temperatura', 'intervalo de tempo'];
  const intervalos = ["nenhum","10 segundos", "30 segundos", "1 minuto", "5 minutos", "10 minutos", "30 minutos", "1 hora"];
  const intervaloValues = [10000, 30000, 60000, 300000, 600000, 1800000, 3600000];
  const duracoes = ["nenhuma","5 segundos", "10 segundos", "30 segundos", "1 minuto", "2 minutos"];
  const duracaoValues = [5000, 10000, 30000, 60000, 120000];

  // Carregar configurações do Firebase
  useEffect(() => {
    const unsubscribe = onValue(configRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTipoIrrigacao(data.TipoIrrigacao || 0);
        setIntervalo(data.Intervalo || 10000);
        setDuracao(data.Duracao || 0);
        setBombaStatus(data.ativarBomba || 0);
      }
      setLoading(false);
    }, (error) => {
      console.error("Erro ao carregar configurações:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

const abrirModal = (title, message, onConfirm) => {
  setModalData({ 
    title, 
    message, 
    onConfirm: () => {
      onConfirm(); // Executa a ação confirmada
      setModalVisible(false); // Fecha o modal após a ação
    } 
  });
  setModalVisible(true);
};

  // const abrirModal = (title, message, onConfirm) => {
  //   setModalData({ title, message, onConfirm });
  //   setModalVisible(true);
  // };

  const iniciarIrrigacao = async () => {
    try {
      setLoading(true);
      await update(configRef, {
        TipoIrrigacao: tipoIrrigacao,
        Intervalo: intervalo,
        Duracao: duracao,
        ativarBomba: 1
      });
      Alert.alert('Sucesso', 'Irrigação iniciada com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao iniciar irrigação');
      console.error("Erro ao iniciar irrigação:", error);
    } finally {
      setLoading(false);
    }
  };

  const pararIrrigacao = async () => {
    try {
      setLoading(true);
      await update(configRef, {
        ativarBomba: 0
      });
      Alert.alert('Sucesso', 'Irrigação parada com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao parar irrigação');
      console.error("Erro ao parar irrigação:", error);
    } finally {
      setLoading(false);
    }
  };

  const limparDados = async () => {
    try {
      setLoading(true);
      await update(configRef, {
        TipoIrrigacao: 0,
        Intervalo: 10000,
        Duracao: 0,
        ativarBomba: 0
      });
      setTipoIrrigacao(0);
      setIntervalo(10000);
      setDuracao(0);
      setBombaStatus(0);
      Alert.alert('Sucesso', 'Configurações resetadas!');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao resetar configurações');
      console.error("Erro ao resetar configurações:", error);
    } finally {
      setLoading(false);
    }
  };

  const salvarConfiguracoes = async () => {
    try {
      setLoading(true);
      await update(configRef, {
        TipoIrrigacao: tipoIrrigacao,
        Intervalo: intervalo,
        Duracao: duracao,
        ativarBomba: 0
      });
      Alert.alert('Sucesso', 'Configurações salvas com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar configurações');
      console.error("Erro ao salvar configurações:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#2E5939" />
        </View>
      )}
      
      <View style={styles.cabecalho}>
        <Image source={Logo} style={styles.img} />
        <Text style={styles.title}>Configurações de Irrigação</Text>
        <TouchableOpacity onPress={() => router.push('/home')}>
          <Image source={Voltar} style={{ width: 24, height: 24 }} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContent}>
        <View style={styles.cardGroup}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Configurações da Bomba</Text>
            
            <View>
              <Text style={styles.label}>Tipo de Irrigação:</Text>
              <Picker
                selectedValue={tipoIrrigacao}
                onValueChange={(itemValue) => setTipoIrrigacao(itemValue)}
                style={styles.picker}
              >
                {tiposIrrigacao.map((item, index) => (
                  <Picker.Item key={index} label={item} value={index} />
                ))}
              </Picker>
            </View>

            <View>
              <Text style={styles.label}>Intervalo:</Text>
              <Picker
                selectedValue={intervalo}
                onValueChange={(itemValue) => setIntervalo(itemValue)}
                style={styles.picker}
              >
                {intervaloValues.map((value, index) => (
                  <Picker.Item key={index} label={intervalos[index]} value={value} />
                ))}
              </Picker>
            </View>

            <View>
              <Text style={styles.label}>Duração:</Text>
              <Picker
                selectedValue={duracao}
                onValueChange={(itemValue) => setDuracao(itemValue)}
                style={styles.picker}
              >
                {duracaoValues.map((value, index) => (
                  <Picker.Item key={index} label={duracoes[index]} value={value} />
                ))}
              </Picker>
            </View>

            <View style={styles.info}>
              <Text style={styles.label}>Status da bomba:</Text>
              <Text style={styles.statusText}>
                {bombaStatus ? 'IRRIGAÇÃO ATIVA' : 'IRRIGAÇÃO INATIVA'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

<ConfirmModal
  visible={modalVisible}
  title={modalData.title}
  message={modalData.message}
  onConfirm={modalData.onConfirm}
  onCancel={() => setModalVisible(false)} // Fecha ao cancelar
  confirmText="Sim"
  cancelText="Não"
/>


      {/* <ConfirmModal
        visible={modalVisible}
        title={modalData.title}
        message={modalData.message}
        onConfirm={modalData.onConfirm}
        onCancel={() => setModalVisible(false)}
        confirmText="Sim"
        cancelText="Não"
      /> */}

      <View style={styles.rodape}>
        <TouchableOpacity
          style={[styles.btn, loading && styles.disabledBtn]}
          onPress={() => abrirModal('Limpar', 'Resetar todas as configurações?', limparDados)}
          disabled={loading}
        >
          <Text style={styles.btnText}>Limpar</Text>
        </TouchableOpacity>

        {bombaStatus ? (
          <TouchableOpacity
            style={[styles.btn, styles.btnStop, loading && styles.disabledBtn]}
            onPress={() => abrirModal('Parar', 'Deseja parar a irrigação?', pararIrrigacao)}
            disabled={loading}
          >
            <Text style={styles.btnText}>Parar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.btn, styles.btnPrimary, loading && styles.disabledBtn]}
            onPress={() => abrirModal('Iniciar', 'Deseja iniciar a irrigação?', iniciarIrrigacao)}
            disabled={loading}
          >
            <Text style={styles.btnText}>Irrigar</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.btn, loading && styles.disabledBtn]}
          onPress={() => abrirModal('Salvar', 'Salvar as configurações?', salvarConfiguracoes)}
          disabled={loading}
        >
          <Text style={styles.btnText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Sensor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECFFD4',
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
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
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 4,
    padding: 6,
    marginLeft: 5,
    flex: 1,
  },
  pickerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 4,
    marginLeft: 5,
  },
  picker: {
    height: 40,
    width: '100%',
  },
  scrollContent: {
    flex: 1,
    marginBottom: 50,
  },
  cardGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  card: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#000000',
    padding: 20,
    borderRadius: 5,
    margin: 20,
    width: 300,
  },
  rodape: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#2E5939',
  },
  btn: {
    height: 30,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    width: 100
  },
  btnPrimary: {
    backgroundColor: '#4CAF50',
  },
  btnStop: {
    backgroundColor: '#F44336',
  },
  disabledBtn: {
    backgroundColor: '#cccccc',
  },
  btnText: {
    color: '#2E5939',
    fontWeight: 'bold',
  },
  label: {
    marginTop: 20
  },
  statusText: {
    fontWeight: 'bold',
    color: '#2E5939',
    marginLeft: 10
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  }
});


// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   Alert,
//   ActivityIndicator
// } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import Logo from '../assets/img/Logo.svg';
// import Voltar from '../assets/img/Voltar.png';
// import ConfirmModal from './modal';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import { Picker } from '@react-native-picker/picker';
// import { getDatabase, ref, onValue, update } from 'firebase/database';
// import { app } from './database/firebaseConfig';

// const Sensor = () => {
//   const { dados, config } = useLocalSearchParams();
//   const leituras = JSON.parse(dados || '[]');
//   const sensorConfig = JSON.parse(config || '{}');
//   const router = useRouter();

//   const db = getDatabase(app);
//   const configRef = ref(db, 'Raimundo/config'); // 🔧 Ajuste aqui!

//   const [loading, setLoading] = useState(true);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalData, setModalData] = useState({
//     title: '',
//     message: '',
//     onConfirm: () => {},
//   });

//   const [tipoIrrigacao, setTipoIrrigacao] = useState(0);
//   const [intervalo, setIntervalo] = useState(0);
//   const [temperatura, setTemperatura] = useState(0);
//   const [duracao, setDuracao] = useState(0);

//   const tiposIrrigacao = ['nenhuma', 'temperatura', 'intervalo de tempo'];
//   const intervalos = ['nenhum', '1h', '2h', '4h', '6h', '12h', '24h'];
//   const temperaturas = ['nenhum', 'maior que 14ºC', 'maior que 20ºC', 'maior que 27ºC'];
//   const duracoes = ['nenhum', '10s', '30s', '1min', '2min'];

//   useEffect(() => {
//     const fetchConfig = () => {
//       onValue(configRef, (snapshot) => {
//         const data = snapshot.val();
//         if (data) {
//           console.log('Dados carregados:', data);
//           setTipoIrrigacao(data.TipoIrrigacao || 0);
//           setIntervalo(mapValueToIntervaloIndex(data.Intervalo));
//           setTemperatura(mapValueToTemperaturaIndex(data.Temperatura));
//           setDuracao(mapValueToDuracaoIndex(data.Duracao));
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

//   // Mapping functions
//   // const mapTipoIrrigacaoToValue = (index) => index;
//   // const mapIntervaloToValue = (index) => [0, 3600000, 7200000, 14400000, 21600000, 43200000, 86400000][index];
//   // const mapTemperaturaToValue = (index) => ["0", "14", "20", "27"][index];
//   // const mapDuracaoToValue = (index) => [0, 10000, 30000, 60000, 120000][index];

//   const mapIntervaloToValue = (index) => {
//   const intervalosMs = [0, 3600000, 7200000, 14400000, 21600000, 43200000, 86400000];
//   return intervalosMs[index] !== undefined ? intervalosMs[index] : 0;
// };

// const mapTemperaturaToValue = (index) => {
//   const temperaturasValores = ["0", "14", "20", "27"];
//   return temperaturasValores[index] !== undefined ? temperaturasValores[index] : "0";
// };

// const mapDuracaoToValue = (index) => {
//   const duracoesMs = [0, 10000, 30000, 60000, 120000];
//   return duracoesMs[index] !== undefined ? duracoesMs[index] : 0;
// };


//   const mapValueToIntervaloIndex = (value) => {
//     const options = [0, 3600000, 7200000, 14400000, 21600000, 43200000, 86400000];
//     return options.indexOf(value);
//   };

//   const mapValueToTemperaturaIndex = (value) => {
//     const options = ["0", "14", "20", "27"];
//     return options.indexOf(String(value));
//   };

//   const mapValueToDuracaoIndex = (value) => {
//     const options = [0, 10000, 30000, 60000, 120000];
//     return options.indexOf(value);
//   };

//   const iniciarIrrigacao = async () => {
//     try {
//       setLoading(true);
//       await update(configRef, {
//         ativarBomba: 1,
//       });
//       Alert.alert('Sucesso', 'Irrigação iniciada com sucesso!');
//     } catch (error) {
//       Alert.alert('Erro', 'Falha ao iniciar irrigação');
//       console.error("Erro ao iniciar irrigação:", error);
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
//       setTipoIrrigacao(0);
//       setIntervalo(0);
//       setTemperatura(0);
//       setDuracao(0);
//       Alert.alert('Sucesso', 'Dados limpos com sucesso!');
//     } catch (error) {
//       Alert.alert('Erro', 'Falha ao limpar dados');
//       console.error("Erro ao limpar dados:", error);
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
//     } catch (error) {
//       Alert.alert('Erro', 'Falha ao salvar configurações');
//       console.error("Erro ao salvar configurações:", error);
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

//             <Text style={styles.label}>Tipo de Irrigação:</Text>
//             <Picker
//               selectedValue={tipoIrrigacao}
//               onValueChange={setTipoIrrigacao}
//               style={styles.picker}
//             >
//               {tiposIrrigacao.map((item, index) => (
//                 <Picker.Item key={index} label={item} value={index} />
//               ))}
//             </Picker>

//             <Text style={styles.label}>Intervalo:</Text>
//             <Picker
//               selectedValue={intervalo}
//               onValueChange={setIntervalo}
//               style={styles.picker}
//             >
//               {intervalos.map((item, index) => (
//                 <Picker.Item key={index} label={item} value={index} />
//               ))}
//             </Picker>

//             <Text style={styles.label}>Temperatura:</Text>
//             <Picker
//               selectedValue={temperatura}
//               onValueChange={setTemperatura}
//               style={styles.picker}
//             >
//               {temperaturas.map((item, index) => (
//                 <Picker.Item key={index} label={item} value={index} />
//               ))}
//             </Picker>

//             <Text style={styles.label}>Duração:</Text>
//             <Picker
//               selectedValue={duracao}
//               onValueChange={setDuracao}
//               style={styles.picker}
//             >
//               {duracoes.map((item, index) => (
//                 <Picker.Item key={index} label={item} value={index} />
//               ))}
//             </Picker>
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

// // 🧾 Estilos
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
//   scrollContent: {
//     flex: 1,
//     marginBottom: 50,
//   },
//   cardGroup: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
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
//   cardTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     alignSelf: 'center',
//   },
//   label: {
//     marginTop: 20,
//   },
//   picker: {
//     height: 40,
//     width: '100%',
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
//     width: 100,
//   },
//   disabledBtn: {
//     backgroundColor: '#cccccc',
//   },
//   btnText: {
//     color: '#2E5939',
//     fontWeight: 'bold',
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
//   },
// });



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
