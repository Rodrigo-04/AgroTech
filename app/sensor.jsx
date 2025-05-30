// import { StyleSheet, Text, View, Image, Button } from 'react-native'
// import React from 'react'
// import Logo from '../assets/img/Logo.svg'
// import { Link, useLocalSearchParams } from 'expo-router'
// import { ScrollView } from 'react-native-web'

// const { id, nome, temperatura, umidade, chuva } = useLocalSearchParams();

// const Sensor = () => {
//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.cabecalho}>
//               <Image source={Logo} style={styles.img} />
//               <Text style={styles.title}>Sensores</Text>
//               <Text style={[styles.title, {color: '#000000'}]}>III</Text>
//             </View>
//                 <Link href={'/home'}>voltar</Link>
//             <View style={styles.cardGroup}>
//                 <View style={styles.card}>
//                 <Text style={[styles.title, {color: '#000000'}]}>Sobre o Sensor:</Text>
//                 <Text>Nome: </Text>
//                 <Text>{nome}</Text>
//                 <Text>Planta: </Text>
//                 <Text>{}</Text>
//                 </View>
//                 <View style={styles.card}>
//                 <Text style={[styles.title, {color: '#000000'}]}>Informações:</Text>
//                 <Text>Temperatura: </Text>
//                 <Text>{temperatura}</Text>
//                 <Text>Umidade: </Text>
//                 <Text>{umidade}</Text>
//                 <Text>Chance de chuva: </Text>
//                 <Text>{chuva}</Text>
//                 </View>
//                 <View style={styles.card}>
//                 <Text style={[styles.title, {color: '#000000'}]}>Controles:</Text>
//                 <Text>Irrigar: </Text>
//                 <Text>{}</Text>
//                 <Text>Não irrigar: </Text>
//                 <Text>{}</Text>
//                 <Text>Intervalo de irrigação: </Text>
//                 <Text>{}</Text>
//                 <Text>Tempo de irrigação:</Text>
//                 <Text>{}</Text>
//                 </View>
//             </View>
//             <View style={styles.rodape}>
//                 <Button style={styles.button}>Excluir</Button>
//                 <Button style={styles.button}>Irrigar</Button>
//                 <Button style={styles.button}>Salvar</Button>
//             </View>
//     </ScrollView>
//   )
// }

// export default Sensor


import { StyleSheet, Text, View, Image, Button } from 'react-native'
import React, { useState } from 'react'
import Logo from '../assets/img/Logo.svg'
import { useLocalSearchParams } from 'expo-router'
import { Link } from 'expo-router'
import { ScrollView, TextInput } from 'react-native-web'

const Sensor = () => {
  const { id, nome, temperatura, umidade, chuva } = useLocalSearchParams();

    const [textNome, setTextNome] = useState(nome);

  return (
    <View style={styles.container}>
    
      <View style={styles.cabecalho}>
        <Image source={Logo} style={styles.img} />
        <Text style={styles.title}>Sensores</Text>
        <Text style={[styles.title, { color: '#000000' }]}>III</Text>
      </View>

      <Link href="/home">Voltar</Link>
    <ScrollView style={styles.scrollContent}>
      <View style={styles.cardGroup}>
        <View style={styles.card}>
          <Text style={[styles.title, { color: '#000000' }]}>Sobre o Sensor:</Text>
          <View style={styles.info}>
            <Text>Nome:   </Text>
            <TextInput
                  style={styles.input}
                  value={textNome}
                  onChangeText={setTextNome}
                  placeholder='Sem nome'
                />
            </View>
            <View style={styles.info}>
          <Text>Planta:   </Text>
          <TextInput
                  style={styles.input}
                  value={''}
                  onChangeText={''}
                  placeholder='Registrar planta'
                />
                </View>
        </View>

        <View style={styles.card}>
          <Text style={[styles.title, { color: '#000000' }]}>Informações:</Text>
          <View style={styles.info}>
            <Text>Temperatura:   </Text>
            <Text>{temperatura}</Text>
            </View>
            <View style={styles.info}>
                <Text>Umidade:   </Text>
                <Text>{umidade}</Text>
            </View>
            <View style={styles.info}>
                <Text>Chance de chuva:   </Text>
                <Text>{chuva}</Text>
            </View>
        </View>

        <View style={styles.card}>
            <Text style={[styles.title, { color: '#000000' }]}>Controles:</Text>
            <Text>Irrigar:</Text>
            <View style={styles.info}>
                <Text>Não irrigar:   </Text>
                <TextInput
                  style={styles.input}
                  value={''}
                  onChangeText={''}
                  placeholder='Nenhuma regra'
                />
            </View>
            <View style={styles.info}>
                <Text>Intervalo de irrigação:   </Text>
                <TextInput
                  style={styles.input}
                  value={''}
                  onChangeText={''}
                  placeholder='Nenhuma regra'
                />
            </View>
            <View style={styles.info}>
                <Text>Tempo de irrigação:   </Text>
                <TextInput
                  style={styles.input}
                  value={''}
                  onChangeText={''}
                  placeholder='Nenhuma regra'
                />
            </View>
        </View>
      </View>
    </ScrollView>

      <View style={styles.rodape}>
        <Button title="Excluir" />
        <Button title="Irrigar" />
        <Button title="Salvar" />
      </View>
    </View>
  )
}

export default Sensor;

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
  info: {
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
  },
  button: {
    width: '30%'
  },
  cardGroup: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    backgroundColor: '#ffffff',
    border: 'solid 1px #000000',
    padding: 20,
    borderRadius: 5,
    //boxShadow: '4px 4px rgba(0,0,0,0.1)',
    margin: 20,
    width: 300,
  },
    scrollContent: {
    flex: 1,
    marginBottom: 50, // espaço para o rodapé
  }
})