import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import Logo from '../assets/img/Logo.svg'
import Wifi from '../assets/img/Wifi.svg'

const Home = ({ hasSensor = true }) => {
  const router = useRouter();

  const sensores = [
    { id: 1, nome: 'Sensor A'},
    { id: 2, nome: 'Sensor B'},
    { id: 3, nome: 'Sensor C'},
    { id: 4, nome: 'Sensor D'},
    { id: 5, nome: 'Sensor E'},
    { id: 6, nome: 'Sensor F'},
    { id: 7, nome: 'Sensor G'},
    { id: 8, nome: 'Sensor H'},
    { id: 9, nome: 'Sensor I'},
  ];

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
        {hasSensor ? (
          <View>
            {sensores.map((sensor) => (
              <TouchableOpacity key={sensor.id}>
                <View style={styles.sensor}>
                    <Image source={Wifi} style={styles.imgSensor} />
                    <Text>{sensor.nome}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View>
            <Text>Loading...</Text>
          </View>
        )}
      </ScrollView>

      {/* Rodapé fixo */}
      <View style={styles.rodape}>
        <TouchableOpacity style={styles.btn} onPress={() => router.push('/home')}>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>        
        <TouchableOpacity style={styles.btn} onPress={() => router.push('/ajuda')}>
          <Text style={styles.btnText}>?</Text>
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
  sensor: {
      display: 'flex',
      flexDirection: 'row',
      width: '50%',
      marginTop: 10,
      alignSelf: 'center',
      justifyContent: 'space-around'
    },
    imgSensor: {
      width: 30,
      height: 30
    },
  btn: {
    width: 30,
    height: 30,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100
  },
  btnText: {
    color: '#2E5939',
    fontFamily: '20px',
    fontWeight: 'bold'
  }
});
