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
      onConfirm();
      setModalVisible(false);
    } 
  });
  setModalVisible(true);
};

//funções dos botões
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
  onCancel={() => setModalVisible(false)}
  confirmText="Sim"
  cancelText="Não"
/>

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