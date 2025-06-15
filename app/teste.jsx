//front precisa receber temperatura, umidade e se a bomba está ligada ou desligada
//front precisa passar se a bomba vai ligar e desligar

//SQLite

import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-web';

const Teste = () => {
  const [texto, setTexto] = useState('Valor inicial carregado');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={texto}
        onChangeText={setTexto}
        placeholder="Digite algo"
      />
    </View>
  )
}

export default Teste

const styles = StyleSheet.create({})