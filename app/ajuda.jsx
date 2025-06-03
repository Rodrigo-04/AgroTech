import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import Logo from '../assets/img/Logo.svg'
const Help = () => {
    const router = useRouter();
  return (
    <View style={styles.container}>
        <View style={styles.cabecalho}>
                <Image source={Logo} style={styles.img} />
                <Text style={styles.title}>Ajuda</Text>
                <Text style={[styles.title, { color: '#000000' }]}>III</Text>
              </View>
              <ScrollView style={styles.scrollContent}>
      <Text style={styles.texto}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquet ligula vel sem fermentum, ut ullamcorper odio eleifend. Vivamus eget ipsum nec velit tempor laoreet et tincidunt lectus. Curabitur sit amet nisl sit amet risus aliquam sodales in ac mauris. Vestibulum magna urna, laoreet at feugiat ac, malesuada eget libero. Nullam in odio quis erat ultricies hendrerit in sit amet massa. Sed scelerisque ligula sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas elementum mi eget ullamcorper feugiat. Class aptent taciti sociosqu ad litora </Text>
          </ScrollView>
    
          {/* Rodapé fixo */}
          <View style={styles.rodape}>
            <TouchableOpacity style={styles.btn} onPress={() => router.push('/adicionar')}>
              <Text style={styles.btnText}>+</Text>
            </TouchableOpacity>        
            <TouchableOpacity style={styles.btn} onPress={() => router.push('/home')}>
              <Text style={styles.btnText}>Home</Text>
            </TouchableOpacity>
          </View>
    </View>
  )
}

export default Help

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
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    width: '90%',
    textAlign: 'center',
    alignSelf: 'center'
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
