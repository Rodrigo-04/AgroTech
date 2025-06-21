import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import Logo from '../assets/img/Logo.svg';
import Wifi from '../assets/img/Wifi2.svg';
import ConfirmModal from './modal';
import Voltar from '../assets/img/Voltar.png';
import mqtt from 'mqtt';
import { Buffer } from 'buffer';
global.Buffer = Buffer;

const Adicionar = () => {
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [modalData, setModalData] = useState({
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const [sensores, setSensores] = useState([]);
  const [sensorData, setSensorData] = useState({}); // armazena dados por ID

  useEffect(() => {
    const client = mqtt.connect('wss://broker.hivemq.com:8884/mqtt');

    client.on('connect', () => {
      console.log('Conectado ao broker');
      for (let i = 1; i <= 5; i++) {
        client.subscribe(`sensor/${i}/nome`);
        client.subscribe(`sensor/${i}/temperatura`);
        client.subscribe(`sensor/${i}/umidade`);
      }
    });

    client.on('message', (topic, message) => {
      const payload = message.toString();
      const [, id, tipo] = topic.split('/');

      setSensorData(prev => {
        const novoSensor = { ...(prev[id] || {}), id: parseInt(id) };
        novoSensor[tipo] = tipo === 'temperatura' || tipo === 'umidade'
          ? parseFloat(payload)
          : payload;

        const novosSensores = { ...prev, [id]: novoSensor };

        // Atualiza lista visual apenas se estiver completo (nome, temperatura, umidade)
        if (
          novoSensor.nome &&
          novoSensor.temperatura !== undefined &&
          novoSensor.umidade !== undefined &&
          !sensores.find(s => s.id === parseInt(id))
        ) {
          setSensores(old => [...old, novoSensor]);
        }

        return novosSensores;
      });
    });

    return () => client.end();
  }, []);

  const abrirModal = (sensor) => {
    setSelectedSensor(sensor);
    setModalData({
      title: 'Sensor adicionado!',
      message: `Deseja configurar o ${sensor.nome} agora?`,
    });
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.cabecalho}>
        <Image source={Logo} style={styles.img} />
        <Text style={styles.title}>Lista sensores</Text>
        <TouchableOpacity onPress={() => router.push('/home')}>
          <Image source={Voltar} style={{ width: 24, height: 24 }} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      {/* Lista de Sensores */}
      <ScrollView style={styles.scrollContent}>
        {sensores.length === 0 ? (
          <View style={styles.sensor}>
            <Text>Procurando sensores MQTT...</Text>
          </View>
        ) : (
          sensores.map((sensor) => (
            <TouchableOpacity key={sensor.id} onPress={() => abrirModal(sensor)}>
              <View style={styles.sensor}>
                <Image source={Wifi} style={styles.imgSensor} />
                <Text>{sensor.nome}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Modal de Confirmação */}
      <ConfirmModal
        visible={modalVisible}
        title={modalData.title}
        message={modalData.message}
        onConfirm={() => {
          setModalVisible(false);
          router.push({
            pathname: '/home',
            params: {
              id: selectedSensor.id,
              nome: selectedSensor.nome,
              temperatura: selectedSensor.temperatura,
              umidade: selectedSensor.umidade,
            },
          });
        }}
        onCancel={() => setModalVisible(false)}
        confirmText={"Configurar"}
        cancelText={"Depois"}
      />

      {/* Rodapé */}
      <View style={styles.rodape}>
        <TouchableOpacity style={styles.btn} onPress={() => router.push('/home')}>
          <Text style={styles.btnText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => router.push('/ajuda')}>
          <Text style={styles.btnText}>Ajuda</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Adicionar;

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
  scrollContent: {
    flex: 1,
    marginBottom: 50,
  },
  sensor: {
    flexDirection: 'row',
    width: '50%',
    marginTop: 10,
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
  imgSensor: {
    width: 30,
    height: 30,
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




// import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'expo-router';
// import Logo from '../assets/img/Logo.svg';
// import Wifi from '../assets/img/Wifi2.svg';
// import ConfirmModal from './modal';
// import Voltar from '../assets/img/Voltar.png'
// import Soma from '../assets/img/Soma.png'
// import Interrogacao from '../assets/img/Interrogacao.png'

// const Adicionar = () => {
//   const router = useRouter();

//   const [loading, setLoading] = useState(true);
//   const [sensores, setSensores] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedSensor, setSelectedSensor] = useState(null);

//   const [modalData, setModalData] = useState({
//     title: '',
//     message: '',
//     onConfirm: () => {},
//   });

//   useEffect(() => {
//     setTimeout(() => {
//       setSensores([
//         { id: 1, nome: 'Sensor A', temperatura: 72, umidade: 0.5, chuva: -3 },
//         { id: 2, nome: 'Sensor B', temperatura: 68, umidade: 0.8, chuva: 10 },
//         { id: 3, nome: 'Sensor C', temperatura: 74, umidade: 0.3, chuva: 5 },
//         { id: 4, nome: 'Sensor D', temperatura: 71, umidade: 0.6, chuva: 7 },
//         { id: 5, nome: 'Sensor E', temperatura: 69, umidade: 0.7, chuva: 2 },
//         { id: 6, nome: 'Sensor F', temperatura: 70, umidade: 0.4, chuva: 0 },
//         { id: 7, nome: 'Sensor G', temperatura: 73, umidade: 0.5, chuva: 4 },
//         { id: 8, nome: 'Sensor H', temperatura: 75, umidade: 0.6, chuva: 9 },
//         { id: 9, nome: 'Sensor I', temperatura: 67, umidade: 0.8, chuva: 6 },
//       ]);
//       setLoading(false);
//     }, 2000);
//   }, []);

//   const abrirModal = (sensor) => {
//     setSelectedSensor(sensor);
//     setModalData({
//       title: 'Sensor adicionado!',
//       message: 'Deseja configurar este sensor agora?',
//     });
//     setModalVisible(true);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Cabeçalho */}
//       <View style={styles.cabecalho}>
//         <Image source={Logo} style={styles.img} />
//         <Text style={styles.title}>Lista sensores</Text>
//         {/* <Text style={[styles.title, { color: '#000000' }]}>III</Text> */}
//         <Image source={Voltar} href="/home"  style={{ width: 24, height: 24 }} resizeMode="contain" />
//       </View>

//       {/* Conteúdo rolável */}
//       <ScrollView style={styles.scrollContent}>
//         {loading ? (
//           <View style={styles.sensor}>
//             <Text>Carregando sensores...</Text>
//           </View>
//         ) : (
//           sensores.map((sensor) => (
//             <TouchableOpacity key={sensor.id} onPress={() => abrirModal(sensor)}>
//               <View style={styles.sensor}>
//                 <Image source={Wifi} style={styles.imgSensor} />
//                 <Text>{sensor.nome}</Text>
//               </View>
//             </TouchableOpacity>
//           ))
//         )}
//       </ScrollView>

//       <ConfirmModal
//         visible={modalVisible}
//         title={modalData.title}
//         message={modalData.message}
//         onConfirm={() => {
//           setModalVisible(false);
//           router.push({
//             pathname: '/home',
//             params: {
//               id: selectedSensor.id,
//               nome: selectedSensor.nome,
//               temperatura: selectedSensor.temperatura,
//               umidade: selectedSensor.umidade,
//               chuva: selectedSensor.chuva,
//             },
//           });
//         }}
//         onCancel={() => {
//           setModalVisible(false);
//         }}
//         confirmText={"Configurar"}
//         cancelText={"Depois"}
//       />

//       {/* Rodapé fixo */}
//       <View style={styles.rodape}>
//         {/* <TouchableOpacity style={styles.btn} onPress={() => router.push('/home')}>
//           <Text style={styles.btnText}>Home</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.btn} onPress={() => router.push('/ajuda')}>
//           <Text style={styles.btnText}>?</Text>
//         </TouchableOpacity> */}
//        <TouchableOpacity style={styles.btn} onPress={() => router.push('/home')}>
//           <Text style={styles.btnText}>Home</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.btn} onPress={() => router.push('/ajuda')}>
//                   <Text style={styles.btnText}>Ajuda</Text>
//                 </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default Adicionar;

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
//   sensor: {
//     flexDirection: 'row',
//     width: '50%',
//     marginTop: 10,
//     alignSelf: 'center',
//     justifyContent: 'space-around',
//   },
//   imgSensor: {
//     width: 30,
//     height: 30,
//   },
//   btn: {
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

