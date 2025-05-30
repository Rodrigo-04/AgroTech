// import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React from 'react'
// import { Link, useRouter } from 'expo-router'
// import Logo from '../assets/img/Logo.svg'
// import { ScrollView } from 'react-native-web'

// const Home = ({hasSensor}) => {
//   hasSensor = true;

//   const router = useRouter();
  
//   const sensores = [
//   { id: 1, nome: 'Sensor A - Milho', temperatura: 72, umidade: 0.5, chuva: -3 },
//   { id: 2, nome: 'Sensor B - Soja', temperatura: 68, umidade: 0.8, chuva: 10 },
//   { id: 3, nome: 'Sensor C - Trigo', temperatura: 74, umidade: 0.3, chuva: 5 },
// ];

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.cabecalho}>
//         <Image source={Logo} style={styles.img} />
//         <Text style={styles.title}>Controle seus sensores</Text>
//         <Text style={[styles.title, {color: '#000000'}]}>III</Text>
//       </View>
//       <ScrollView>
//         {hasSensor ? 
//         <View style={styles.cardGroup}>
//         {sensores.map((sensor) => (
//         <TouchableOpacity key={sensor.id} onPress={() => router.push('/sensor')}>
//           <View style={styles.card }>
//             <Text>{sensor.nome}</Text>
//             <br />
//             <View style={styles.texto}>
//             <Text>Temperatura: </Text>
//             <Text>{sensor.temperatura}</Text>
//             </View>
//             <br />
//             <View  style={styles.texto}>
//             <Text>Umidade: </Text>
//             <Text>{sensor.umidade}</Text>
//             </View>
//             <br />
//             <View style={styles.texto}>
//             <Text>Chance de Chuva: </Text>
//             <Text>{sensor.chuva}</Text>
//             </View>
//           </View>
//           <br />
//         </TouchableOpacity>
//         ))}
//         </View>:<View>
//           <Text>Nenhum sensor foi adicionado!</Text>
//           </View>
//         }
//       </ScrollView>
//       <View style={styles.rodape}>
//         <Text style={styles.title}>+</Text>
//         <Text style={styles.title}>?</Text>
//       </View>
//     </ScrollView>
//   )
// }

// export default Home

// const styles = StyleSheet.create({
//   body: {
//   paddingVertical: 20,
//   paddingBottom: 100, // espaço extra para não cobrir pelo rodapé fixo
//   alignItems: 'center',
// },
//   container: {
//     flex: 1,
//     backgroundColor: '#ECFFD4',
//     //alignItems: 'center',
//     // width: '100%',
//     // height: '100%'
//   },
//   cabecalho: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     width: '100%',
//     height: '100px',
//     backgroundColor: '#2E5939'
//   },
//   link: {
//     marginVertical: 10,
//     borderBottomWidth: 1
//   },
//   img: {
//     width: '80px',
//     height: '80px'
//   },
//   title: {
//     fontWeight: 'bold',
//     fontSize: '20px',
//     color: '#ffffff'
//   },
//   texto: {
//     display: 'flex',
//     flexDirection: 'row'
//   },
//   rodape: {
//     display: 'flex',
//     flexDirection: 'row',
//     width: '100%',
//     height: '50px',
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     backgroundColor: '#2E5939',
//     bottom: '0',
//     position: 'static'
//   },
//   cardGroup: {
//     display: 'flex',
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   card: {
//     backgroundColor: '#C0F7A2',
//     padding: 20,
//     borderRadius: 5,
//     boxShadow: '4px 4px rgba(0,0,0,0.1)',
//     margin: 20,
//     width: 300,
//   }
// })


import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import Logo from '../assets/img/Logo.svg'

const Home = ({ hasSensor = true }) => {
  const router = useRouter();

  const sensores = [
    { id: 1, nome: 'Sensor A', temperatura: 72, umidade: 0.5, chuva: -3 },
    { id: 2, nome: 'Sensor B', temperatura: 68, umidade: 0.8, chuva: 10 },
    { id: 3, nome: 'Sensor C', temperatura: 74, umidade: 0.3, chuva: 5 },
    { id: 4, nome: 'Sensor D', temperatura: 72, umidade: 0.5, chuva: -3 },
    { id: 5, nome: 'Sensor E', temperatura: 68, umidade: 0.8, chuva: 10 },
    { id: 6, nome: 'Sensor F', temperatura: 74, umidade: 0.3, chuva: 5 },
    { id: 7, nome: 'Sensor G', temperatura: 72, umidade: 0.5, chuva: -3 },
    { id: 8, nome: 'Sensor H', temperatura: 68, umidade: 0.8, chuva: 10 },
    { id: 9, nome: 'Sensor I', temperatura: 74, umidade: 0.3, chuva: 5 },
  ];

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.cabecalho}>
        <Image source={Logo} style={styles.img} />
        <Text style={styles.title}>Controle seus sensores</Text>
        <Text style={[styles.title, { color: '#000000' }]}>III</Text>
      </View>

      {/* Conteúdo rolável */}
      <ScrollView style={styles.scrollContent}>
        {hasSensor ? (
          <View style={styles.cardGroup}>
            {sensores.map((sensor) => (
              <TouchableOpacity key={sensor.id} onPress={() => router.push({ pathname: '/sensor', params: { id: sensor.id, nome: sensor.nome, temperatura: sensor.temperatura, umidade: sensor.umidade, chuva: sensor.chuva } })}>
                <View style={styles.card}>
                  <Text>{sensor.nome}</Text>
                  <View style={styles.texto}>
                    <Text>Temperatura: </Text>
                    <Text>{sensor.temperatura}</Text>
                  </View>
                  <View style={styles.texto}>
                    <Text>Umidade: </Text>
                    <Text>{sensor.umidade}</Text>
                  </View>
                  <View style={styles.texto}>
                    <Text>Chance de Chuva: </Text>
                    <Text>{sensor.chuva}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View>
            <Text>Nenhum sensor foi adicionado!</Text>
          </View>
        )}
      </ScrollView>

      {/* Rodapé fixo */}
      <View style={styles.rodape}>
        <Text style={styles.title}>+</Text>
        <Text style={styles.title}>?</Text>
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
    marginBottom: 50, // espaço para o rodapé
  },
  cardGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  card: {
    backgroundColor: '#C0F7A2',
    padding: 20,
    borderRadius: 5,
    margin: 10,
    width: 300,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 4, height: 4 },
  },
});
