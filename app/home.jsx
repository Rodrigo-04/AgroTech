import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>Sensores</Text>
      <Link href={'/'} style={styles.link}>Voltar</Link>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#ECFFD4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    marginVertical: 10,
    borderBottomWidth: 1
  }
})