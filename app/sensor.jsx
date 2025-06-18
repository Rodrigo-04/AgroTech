import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import Logo from '../assets/img/Logo.svg';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ConfirmModal from './modal';
import Voltar from '../assets/img/Voltar.png';
import { Picker } from '@react-native-picker/picker'; // <-- Importando o Picker

const Sensor = () => {
  const { id, nome, temperatura, umidade, chuva } = useLocalSearchParams();
  const router = useRouter();

  const [textNome, setTextNome] = useState(nome);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const [planta, setPlanta] = useState('Nenhuma');
  const [irrigacao, setIrrigacao] = useState('Nenhuma');
  const [intervalo, setIntervalo] = useState('Nenhum');
  const [tempo, setTempo] = useState('Nenhum');

  const abrirModal = (title, message, onConfirm) => {
    setModalData({ title, message, onConfirm });
    setModalVisible(true);
  };


  const plantas = [
  "Abacaxi", "Abacate", "Açaí", "Alface", "Alho",
  "Algodão", "Almeirão", "Amendoim", "Arroz", "Aveia",
  "Banana", "Batata-doce", "Batata inglesa", "Berinjela", "Beterraba",
  "Brócolis", "Cacau", "Café arábica", "Café robusta", "Cana-de-açúcar",
  "Cará", "Cebola", "Cebolinha", "Cenoura", "Chicória",
  "Chuchu", "Coco-da-baía", "Coentro", "Couve", "Couve-flor",
  "Ervilha", "Espinafre", "Feijão carioca", "Feijão preto", "Feijão-fradinho",
  "Figo", "Gergelim", "Goiaba", "Graviola", "Guaraná",
  "Inhame", "Jabuticaba", "Jaca", "Jiló", "Laranja-pera",
  "Laranja-lima", "Lentilha", "Limão-taiti", "Limão-siciliano", "Linhaça",
  "Maçã fuji", "Maçã gala", "Mamão formosa", "Mamão papaia", "Mandioca",
  "Manga palmer", "Manga tommy", "Manjericão", "Maracujá", "Melancia",
  "Melão amarelo", "Milho verde", "Milho de pipoca", "Morango", "Mostarda",
  "Nabo", "Nectarina", "Noz-pecã", "Óleo de palma (dendê)", "Orégano",
  "Palmito pupunha", "Papo-de-peru", "Pequi", "Pepino", "Pera",
  "Pêssego", "Pimentão verde", "Pimentão vermelho", "Pimenta-do-reino", "Pimenta dedo-de-moça",
  "Pinhão", "Pistache", "Quiabo", "Rabanete", "Repolho",
  "Rúcula", "Salsa", "Soja", "Sorgo", "Taioba",
  "Tangerina ponkan", "Tomate rasteiro", "Tomate italiano", "Tomate cereja", "Trigo",
  "Uva niágara", "Uva rubi", "Uva Itália", "Vagem"
];



  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Image source={Logo} style={styles.img} />
        <Text style={styles.title}>Sensores</Text>
        <Image source={Voltar} href="/home" style={{ width: 24, height: 24 }} resizeMode="contain" />
      </View>

      <ScrollView style={styles.scrollContent}>
        <View style={styles.cardGroup}>
          {/* Card 1 - Sobre o sensor */}
          <View style={styles.card}>
            <Text style={[styles.title, { color: '#000000' }]}>Sobre o Sensor:</Text>
            <View style={styles.info}>
              <Text>Nome: </Text>
              <TextInput
                style={styles.input}
                value={textNome}
                onChangeText={setTextNome}
                placeholder="Sem nome"
              />
            </View>
            <View style={styles.info}>
              <Text style={[styles.label, { marginRight: 8 }]}>Planta:</Text>
              <Picker
                selectedValue={planta}
                onValueChange={(itemValue) => setPlanta(itemValue)}
                style={styles.picker}
              >
              <Picker.Item label="Selecione uma planta" value="" />
                {plantas.map((planta, index) => (
                  <Picker.Item key={index} label={planta} value={planta} />
                ))}
              </Picker>
            </View>
          </View>

          {/* Card 2 - Informações */}
          {/* <View style={styles.card}>
            <Text style={[styles.title, { color: '#000000' }]}>Informações:</Text>
            <View style={styles.info}>
              <Text>Temperatura: </Text>
              <Text>{temperatura}</Text>
            </View>
            <View style={styles.info}>
              <Text>Umidade: </Text>
              <Text>{umidade}</Text>
            </View>
            <View style={styles.info}>
              <Text>Chance de chuva: </Text>
              <Text>{chuva}</Text>
            </View>
          </View> */}

          {/* Card 3 - Controles */}
          <View style={styles.card}>
            <Text style={[styles.title, { color: '#000000' }]}>Controles:</Text>

            <Text style={styles.label}>Irrigação automática:</Text>
            <Picker
              selectedValue={irrigacao}
              onValueChange={(itemValue) => setIrrigacao(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Não irrigar" value="nenhuma" />
              <Picker.Item label="Irrigar ao secar" value="secar" />
              <Picker.Item label="Irrigar ao anoitecer" value="anoitecer" />
            </Picker>

            <Text style={styles.label}>Intervalo de irrigação:</Text>
            <Picker
              selectedValue={intervalo}
              onValueChange={(itemValue) => setIntervalo(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Nenhum" value="nenhum" />
              <Picker.Item label="A cada 6h" value="6h" />
              <Picker.Item label="A cada 12h" value="12h" />
              <Picker.Item label="Diariamente" value="24h" />
            </Picker>

            <Text style={styles.label}>Tempo de irrigação:</Text>
            <Picker
              selectedValue={tempo}
              onValueChange={(itemValue) => setTempo(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Nenhum" value="nenhum" />
              <Picker.Item label="30 segundos" value="30s" />
              <Picker.Item label="1 minuto" value="1min" />
              <Picker.Item label="2 minutos" value="2min" />
            </Picker>
          </View>
        </View>
      </ScrollView>

      {/* Modal de confirmação */}
      <ConfirmModal
        visible={modalVisible}
        title={modalData.title}
        message={modalData.message}
        onConfirm={modalData.onConfirm}
        onCancel={() => {
          setModalVisible(false);
          router.push('/sensor');
        }}
        confirmText="Sim"
        cancelText="Não"
      />

      {/* Rodapé com ações */}
      <View style={styles.rodape}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            abrirModal('Confirmar exclusão', 'Tem certeza que deseja excluir este sensor?', () => {
              Alert.alert('Sensor excluído com sucesso!');
              setModalVisible(false);
            })
          }
        >
          <Text style={styles.btnText}>Excluir</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            abrirModal('Iniciar irrigação', 'Deseja iniciar a irrigação?', () => {
              Alert.alert('Irrigação iniciada!');
              setModalVisible(false);
            })
          }
        >
          <Text style={styles.btnText}>Irrigar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            abrirModal('Salvar alterações', 'Deseja salvar as alterações feitas?', () => {
              Alert.alert('Alterações salvas com sucesso!');
              setModalVisible(false);
            })
          }
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
    width: 30,
    height: 30,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    width: 100
  },
  btnText: {
    color: '#2E5939',
    fontWeight: 'bold',
  },
});

