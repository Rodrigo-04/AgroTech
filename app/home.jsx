import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import Logo from '../assets/img/Logo.svg'

const Home = ({hasSensor}) => {
  hasSensor = true;
  return (
    <View style={styles.container}>
      <div style={styles.cabecalho}>
        <Image source={Logo} style={styles.img} />
        <Text style={styles.title}>Controle seus sensores</Text>
        <Text style={[styles.title, {color: '#000000'}]}>III</Text>
      </div>
      <div>
        {hasSensor ? 
        <div>
          <div style={styles.card}>
            {/**fazer loop para carregar vários cards */}
            <Text>Sensor XXX - Milho</Text>
            <br />
            <Text>Temperatura: </Text>
            <Text> 72°C</Text>
            <br />
            <Text>Umidade: </Text>
            <Text> 0.5</Text>
            <br />
            <Text>Chance de Chuva: </Text>
            <Text> -3</Text>
          </div>
          <br />
          <Link href={'/'} style={styles.link}>Voltar</Link>
        </div>:<div>
          <Text>Nenhum sensor foi adicionado!</Text>
          <Link href={'/'} style={styles.link}>Voltar</Link>
          </div>
        }
      </div>
      <div style={styles.rodape}>
        <Text style={styles.title}>+</Text>
        <Text style={styles.title}>?</Text>
      </div>
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
  }, card: {
    borderBlockColor: '#000000',
    borderCurve: '10px',
    borderWidth: '1px',
    borderRadius: '10px'
  }
})