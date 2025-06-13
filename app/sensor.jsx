import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import Logo from '../assets/img/Logo.svg';
import { useLocalSearchParams, Link, useRouter } from 'expo-router';
import ConfirmModal from './modal';

const Sensor = () => {
  const params = useLocalSearchParams();

  // Conversão e fallback para os parâmetros recebidos
  const id = Number(params.id);
  const nomeParam = params.nome || 'Sem nome';
  const temperatura = Number(params.temperatura);
  const umidade = Number(params.umidade);
  const chuva = Number(params.chuva);

  const router = useRouter();

  const [textNome, setTextNome] = useState(nomeParam);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const abrirModal = (title, message, onConfirm) => {
    setModalData({ title, message, onConfirm });
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Image source={Logo} style={styles.img} />
        <Text style={styles.title}>Sensores</Text>
        <Text style={[styles.title, { color: '#000000' }]}>III</Text>
      </View>

      <Link href="/home">Voltar</Link>

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
              <Text>Planta: </Text>
              <TextInput
                style={styles.input}
                value=""
                onChangeText={() => {}}
                placeholder="Registrar planta"
              />
            </View>
          </View>

          {/* Card 2 - Informações */}
          <View style={styles.card}>
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
          </View>

          {/* Card 3 - Controles */}
          <View style={styles.card}>
            <Text style={[styles.title, { color: '#000000' }]}>Controles:</Text>
            <Text>Irrigar:</Text>
            <View style={styles.info}>
              <Text>Não irrigar: </Text>
              <TextInput style={styles.input} value="" onChangeText={() => {}} placeholder="Nenhuma regra" />
            </View>
            <View style={styles.info}>
              <Text>Intervalo de irrigação: </Text>
              <TextInput style={styles.input} value="" onChangeText={() => {}} placeholder="Nenhuma regra" />
            </View>
            <View style={styles.info}>
              <Text>Tempo de irrigação: </Text>
              <TextInput style={styles.input} value="" onChangeText={() => {}} placeholder="Nenhuma regra" />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Modal reutilizável */}
      <ConfirmModal
        visible={modalVisible}
        title={modalData.title}
        message={modalData.message}
        onConfirm={modalData.onConfirm}
        onCancel={() => {
          setModalVisible(false);
          router.push('/sensor');
        }}
        confirmText={"Sim"}
        cancelText={"Não"}
      />

      {/* Rodapé com botões */}
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

// Estilos mantidos iguais
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
    width: '20%',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  btnText: {
    color: '#2E5939',
    fontWeight: 'bold',
  },
});



// import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
// import React, { useState } from 'react';
// import Logo from '../assets/img/Logo.svg';
// import { useLocalSearchParams, Link, useRouter } from 'expo-router';
// import ConfirmModal from './modal';

// const Sensor = () => {
//   const { id, nome, temperatura, umidade, chuva } = useLocalSearchParams();

//   const router = useRouter();

//   const [textNome, setTextNome] = useState(nome);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalData, setModalData] = useState({
//     title: '',
//     message: '',
//     onConfirm: () => {},
//   });

//   const abrirModal = (title, message, onConfirm) => {
//     setModalData({ title, message, onConfirm });
//     setModalVisible(true);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.cabecalho}>
//         <Image source={Logo} style={styles.img} />
//         <Text style={styles.title}>Sensores</Text>
//         <Text style={[styles.title, { color: '#000000' }]}>III</Text>
//       </View>

//       <Link href="/home">Voltar</Link>

//       <ScrollView style={styles.scrollContent}>
//         <View style={styles.cardGroup}>
//           {/* Card 1 - Sobre o sensor */}
//           <View style={styles.card}>
//             <Text style={[styles.title, { color: '#000000' }]}>Sobre o Sensor:</Text>
//             <View style={styles.info}>
//               <Text>Nome: </Text>
//               <TextInput
//                 style={styles.input}
//                 value={textNome}
//                 onChangeText={setTextNome}
//                 placeholder="Sem nome"
//               />
//             </View>
//             <View style={styles.info}>
//               <Text>Planta: </Text>
//               <TextInput
//                 style={styles.input}
//                 value=""
//                 onChangeText={() => {}}
//                 placeholder="Registrar planta"
//               />
//             </View>
//           </View>

//           {/* Card 2 - Informações */}
//           <View style={styles.card}>
//             <Text style={[styles.title, { color: '#000000' }]}>Informações:</Text>
//             <View style={styles.info}>
//               <Text>Temperatura: </Text>
//               <Text>{temperatura}</Text>
//             </View>
//             <View style={styles.info}>
//               <Text>Umidade: </Text>
//               <Text>{umidade}</Text>
//             </View>
//             <View style={styles.info}>
//               <Text>Chance de chuva: </Text>
//               <Text>{chuva}</Text>
//             </View>
//           </View>

//           {/* Card 3 - Controles */}
//           <View style={styles.card}>
//             <Text style={[styles.title, { color: '#000000' }]}>Controles:</Text>
//             <Text>Irrigar:</Text>
//             <View style={styles.info}>
//               <Text>Não irrigar: </Text>
//               <TextInput style={styles.input} value="" onChangeText={() => {}} placeholder="Nenhuma regra" />
//             </View>
//             <View style={styles.info}>
//               <Text>Intervalo de irrigação: </Text>
//               <TextInput style={styles.input} value="" onChangeText={() => {}} placeholder="Nenhuma regra" />
//             </View>
//             <View style={styles.info}>
//               <Text>Tempo de irrigação: </Text>
//               <TextInput style={styles.input} value="" onChangeText={() => {}} placeholder="Nenhuma regra" />
//             </View>
//           </View>
//         </View>
//       </ScrollView>

//       {/* Modal reutilizável */}
//       <ConfirmModal
//         visible={modalVisible}
//         title={modalData.title}
//         message={modalData.message}
//         onConfirm={modalData.onConfirm}
//         onCancel={() => {
//           setModalVisible(false);
//           router.push('/sensor')
//         }}
//         confirmText={"Sim"}
//         cancelText={"Não"}
//       />

//       {/* Rodapé com botões */}
//       <View style={styles.rodape}>
//         <TouchableOpacity
//           style={styles.btn}
//           onPress={() =>
//             abrirModal('Confirmar exclusão', 'Tem certeza que deseja excluir este sensor?', () => {
//               Alert.alert('Sensor excluído com sucesso!');
//               setModalVisible(false);
//             })
//           }
//         >
//           <Text style={styles.btnText}>Excluir</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.btn}
//           onPress={() =>
//             abrirModal('Iniciar irrigação', 'Deseja iniciar a irrigação?', () => {
//               Alert.alert('Irrigação iniciada!');
//               setModalVisible(false);
//             })
//           }
//         >
//           <Text style={styles.btnText}>Irrigar</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.btn}
//           onPress={() =>
//             abrirModal('Salvar alterações', 'Deseja salvar as alterações feitas?', () => {
//               Alert.alert('Alterações salvas com sucesso!');
//               setModalVisible(false);
//             })
//           }
//         >
//           <Text style={styles.btnText}>Salvar</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default Sensor;

// // Estilos mantidos iguais
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
//   rodape: {
//     flexDirection: 'row',
//     width: '100%',
//     height: 50,
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     backgroundColor: '#2E5939',
//   },
//   btn: {
//     width: '20%',
//     backgroundColor: '#ffffff',
//     borderRadius: 5,
//     paddingVertical: 10,
//     alignItems: 'center',
//   },
//   btnText: {
//     color: '#2E5939',
//     fontWeight: 'bold',
//   },
// });
