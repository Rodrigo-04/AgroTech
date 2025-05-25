//rnefs
import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import Logo from "../assets/img/Logo.svg"
import { Link } from 'expo-router'

const Splash = () => {
  return (
    <View style={styles.container}>
        <Image source={Logo} style={styles.img} />
        <Link href={"/home"}>Sensores</Link>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#2E5939',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: '200px',
    height: '200px'
  }
})