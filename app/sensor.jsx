import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Logo from '../assets/img/Logo.svg'
import { Link } from 'expo-router'
import { ScrollView } from 'react-native-web'

const Sensor = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.cabecalho}>
              <Image source={Logo} style={styles.img} />
              <Text style={styles.title}>Sensores</Text>
              <Text style={[styles.title, {color: '#000000'}]}>III</Text>
            </View>
<Link href={'/home'}>voltar</Link>

            <View style={styles.rodape}>
                <Text style={styles.title}>+</Text>
                <Text style={styles.title}>?</Text>
            </View>
    </ScrollView>
  )
}

export default Sensor

const styles = StyleSheet.create({
    body: {
  paddingVertical: 20,
  paddingBottom: 100, // espaço extra para não cobrir pelo rodapé fixo
  alignItems: 'center',
},
    container: {
    flex: 1,
    backgroundColor: '#ECFFD4',
    //alignItems: 'center',
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
  }
})