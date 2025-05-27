import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import Logo from '../assets/img/Logo.svg'

const Home = ({hasSensor}) => {
  hasSensor = true;
  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Image source={Logo} style={styles.img} />
        <Text style={styles.title}>Controle seus sensores</Text>
        <Text style={[styles.title, {color: '#000000'}]}>III</Text>
      </View>
      <View>
        {hasSensor ? 
        <View style={styles.cardGroup}>
          <View style={styles.card}>
            {/**fazer loop para carregar vários cards */}
            <Text>Sensor XXX - Milho</Text>
            <br />
            <View style={styles.texto}>
            <Text>Temperatura: </Text>
            <Text> 72°C</Text>
            </View>
            <br />
            <View  style={styles.texto}>
            <Text>Umidade: </Text>
            <Text> 0.5</Text>
            </View>
            <br />
            <View style={styles.texto}>
            <Text>Chance de Chuva: </Text>
            <Text> -3</Text>
            </View>
          </View>
          <br />
        </View>:<View>
          <Text>Nenhum sensor foi adicionado!</Text>
          </View>
        }
      </View>
      <View style={styles.rodape}>
        <Text style={styles.title}>+</Text>
        <Text style={styles.title}>?</Text>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#ECFFD4',
    alignItems: 'center',
    // width: '100%',
    // height: '100%'
  },
  cabecalho: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: '100px',
    backgroundColor: '#2E5939'
  },
  link: {
    marginVertical: 10,
    borderBottomWidth: 1
  },
  img: {
    width: '80px',
    height: '80px'
  },
  title: {
    fontWeight: 'bold',
    fontSize: '20px',
    color: '#ffffff'
  },
  texto: {
    display: 'flex',
    flexDirection: 'row'
  },
  rodape: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '50px',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#2E5939',
    bottom: '0',
    position: 'fixed'
  },
  cardGroup: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    backgroundColor: '#C0F7A2',
    padding: 20,
    borderRadius: 5,
    boxShadow: '4px 4px rgba(0,0,0,0.1)',
    margin: 20,
    width: 300,
  }
})