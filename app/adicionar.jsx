import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import Logo from '../assets/img/Logo.svg';
import Wifi from '../assets/img/Wifi.svg';
import ConfirmModal from './modal';

const Adicionar = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [sensores, setSensores] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState(null);

  const [modalData, setModalData] = useState({
    title: '',
    message: '',
    onConfirm: () => {},
  });

  useEffect(() => {
    setTimeout(() => {
      setSensores([
        { id: 1, nome: 'Sensor A', temperatura: 72, umidade: 0.5, chuva: -3 },
        { id: 2, nome: 'Sensor B', temperatura: 68, umidade: 0.8, chuva: 10 },
        { id: 3, nome: 'Sensor C', temperatura: 74, umidade: 0.3, chuva: 5 },
        { id: 4, nome: 'Sensor D', temperatura: 71, umidade: 0.6, chuva: 7 },
        { id: 5, nome: 'Sensor E', temperatura: 69, umidade: 0.7, chuva: 2 },
        { id: 6, nome: 'Sensor F', temperatura: 70, umidade: 0.4, chuva: 0 },
        { id: 7, nome: 'Sensor G', temperatura: 73, umidade: 0.5, chuva: 4 },
        { id: 8, nome: 'Sensor H', temperatura: 75, umidade: 0.6, chuva: 9 },
        { id: 9, nome: 'Sensor I', temperatura: 67, umidade: 0.8, chuva: 6 },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  const abrirModal = (sensor) => {
    setSelectedSensor(sensor);
    setModalData({
      title: 'Sensor adicionado!',
      message: 'Deseja configurar este sensor agora?',
    });
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.cabecalho}>
        <Image source={Logo} style={styles.img} />
        <Text style={styles.title}>Lista sensores</Text>
        <Text style={[styles.title, { color: '#000000' }]}>III</Text>
      </View>

      {/* Conteúdo rolável */}
      <ScrollView style={styles.scrollContent}>
        {loading ? (
          <View style={styles.sensor}>
            <Text>Carregando sensores...</Text>
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

      <ConfirmModal
        visible={modalVisible}
        title={modalData.title}
        message={modalData.message}
        onConfirm={() => {
          modalData.onConfirm(); // ✅ Executa a função
          router.push({
            pathname: '/sensor',
            params: {
              id: selectedSensor.id,
              nome: selectedSensor.nome,
              temperatura: selectedSensor.temperatura,
              umidade: selectedSensor.umidade,
              chuva: selectedSensor.chuva,
            },
          });
        }}
        onCancel={() => {
          setModalVisible(false);
          router.push({
          pathname: '/home',
          params: {
            id: selectedSensor.id,
            nome: selectedSensor.nome,
            temperatura: selectedSensor.temperatura,
            umidade: selectedSensor.umidade,
            chuva: selectedSensor.chuva,
          },
        });
      }}
        confirmText={"Configurar"}
        cancelText={"Depois"}
      />

      {/* Rodapé fixo */}
      <View style={styles.rodape}>
        <TouchableOpacity style={styles.btn} onPress={() => router.push('/home')}>
          <Text style={styles.btnText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => router.push('/ajuda')}>
          <Text style={styles.btnText}>?</Text>
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
  texto: {
    flexDirection: 'row',
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
  btn: {
    width: 30,
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




// import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, Alert } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { useRouter } from 'expo-router'
// import Logo from '../assets/img/Logo.svg'
// import Wifi from '../assets/img/Wifi.svg'
// import ConfirmModal from './modal';

// const Adicionar = () => {
//   const router = useRouter();
  

//     const [loading, setLoading] = useState(true);
//     const [sensores, setSensores] = useState([]);

//     const [modalVisible, setModalVisible] = useState(false);
//     const [modalData, setModalData] = useState({
//       title: '',
//       message: '',
//       onConfirm: () => {},
//     });

//     useEffect(() => {
//         setTimeout(() => {
//             setSensores([
//                 { id: 1, nome: 'Sensor A' },
//                 { id: 2, nome: 'Sensor B' },
//                 { id: 3, nome: 'Sensor C' },
//                 { id: 4, nome: 'Sensor D' },
//                 { id: 5, nome: 'Sensor E' },
//                 { id: 6, nome: 'Sensor F' },
//                 { id: 7, nome: 'Sensor G' },
//                 { id: 8, nome: 'Sensor H' },
//                 { id: 9, nome: 'Sensor I' },
//             ]);
//             setLoading(false);
//         }, 2000);
//     }, []);
  
//     const abrirModal = (title, message, onConfirm) => {
//       setModalData({ title, message, onConfirm });
//       setModalVisible(true);
//     };

//   return (
//     <View style={styles.container}>
//       {/* Cabeçalho */}
//       <View style={styles.cabecalho}>
//         <Image source={Logo} style={styles.img} />
//         <Text style={styles.title}>Lista sensores</Text>
//         <Text style={[styles.title, { color: '#000000' }]}>III</Text>
//       </View>

//       {/* Conteúdo rolável */}
//       <ScrollView style={styles.scrollContent}>
//         {loading ? (
//           <View>
            
//                 <View style={styles.sensor}>
//                     <Text>Carregando sensores...</Text>
//                 </View>
            
//           </View>
//         ) : (
//             sensores.map((sensor) => (
//                 <TouchableOpacity key={sensor.id} 
//                     onPress={() =>
//                     abrirModal('Sensor adicionado!', 'Deseja configurar este sensor agora?',
//                         () => {
//                             Alert.alert('Sensor adicionado!');
//                             setModalVisible(false);
//                 })}>
//                 <View style={styles.sensor}>
//                     <Image source={Wifi} style={styles.imgSensor} />
//                     <Text>{sensor.nome}</Text>
//                 </View>
//               </TouchableOpacity>
//               ))
//         )}
//       </ScrollView>

// <ConfirmModal
//         visible={modalVisible}
//         title={modalData.title}
//         message={modalData.message}
//         onConfirm={() => {
//             modalData.onConfirm;
//             router.push('/sensor');
//         }}
//         onCancel={() => {
//             setModalVisible(false);
//             router.push('/home')
//         }}
//         confirmText={"Configurar"}
//         cancelText={"Depois"}
//       />

//       {/* Rodapé fixo */}
//       <View style={styles.rodape}>
//         <TouchableOpacity style={styles.btn} onPress={() => router.push('/home')}>
//           <Text style={styles.btnText}>Home</Text>
//         </TouchableOpacity>        
//         <TouchableOpacity style={styles.btn} onPress={() => router.push('/ajuda')}>
//           <Text style={styles.btnText}>?</Text>
//         </TouchableOpacity>
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
//     marginBottom: 50, // espaço para o rodapé
//   },
//   sensor: {
//       display: 'flex',
//       flexDirection: 'row',
//       width: '50%',
//       marginTop: 10,
//       alignSelf: 'center',
//       justifyContent: 'space-around'
//     },
//     imgSensor: {
//       width: 30,
//       height: 30
//     },
//   btn: {
//     width: 30,
//     height: 30,
//     backgroundColor: '#ffffff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 100
//   },
//   btnText: {
//     color: '#2E5939',
//     fontFamily: '20px',
//     fontWeight: 'bold'
//   }
// });
