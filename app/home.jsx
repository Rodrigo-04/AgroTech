import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Logo from '../assets/img/Logo.svg'

const Home = ({ hasSensor = true }) => {
  const router = useRouter();

  const params = useLocalSearchParams();

  // const sensores = [
  //   { id: 1, nome: 'Sensor A', temperatura: 72, umidade: 0.5, chuva: -3 },
  //   { id: 2, nome: 'Sensor B', temperatura: 68, umidade: 0.8, chuva: 10 },
  //   { id: 3, nome: 'Sensor C', temperatura: 74, umidade: 0.3, chuva: 5 },
  //   { id: 4, nome: 'Sensor D', temperatura: 72, umidade: 0.5, chuva: -3 },
  //   { id: 5, nome: 'Sensor E', temperatura: 68, umidade: 0.8, chuva: 10 },
  //   { id: 6, nome: 'Sensor F', temperatura: 74, umidade: 0.3, chuva: 5 },
  //   { id: 7, nome: 'Sensor G', temperatura: 72, umidade: 0.5, chuva: -3 },
  //   { id: 8, nome: 'Sensor H', temperatura: 68, umidade: 0.8, chuva: 10 },
  //   { id: 9, nome: 'Sensor I', temperatura: 74, umidade: 0.3, chuva: 5 },
  // ];

  const [sensores, setSensores] = useState([

    { id: 1, nome: 'Sensor A', temperatura: 72, umidade: 0.5, chuva: -3 },
    { id: 2, nome: 'Sensor B', temperatura: 68, umidade: 0.8, chuva: 10 },
  ])

  useEffect(() => {
  if (params?.id) {
    const novoSensor = {
      id: Number(params.id),
      nome: params.nome,
      temperatura: Number(params.temperatura),
      umidade: Number(params.umidade),
      chuva: Number(params.chuva),
    };

    setSensores((prev) => {
      // Evita duplicados com base no ID
      if (prev.some((s) => s.id === novoSensor.id)) return prev;
      return [...prev, novoSensor];
    });
  }
}, [params]);


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
        <TouchableOpacity style={styles.btn} onPress={() => router.push('/adicionar')}>
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
