import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import Logo from '../assets/img/Logo.svg';
import Soma from '../assets/img/Soma.png';
import Interrogacao from '../assets/img/Interrogacao.png';

const Help = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Image source={Logo} style={styles.img} />
        <Text style={styles.title}>Ajuda</Text>
      </View>

      <ScrollView style={styles.scrollContent}>
        <Text style={styles.texto}>
          <Text style={{ fontWeight: 'bold'}}>Bem-vindo ao aplicativo AgroTech!{'\n'}</Text>
          Este app permite o monitoramento de sensores de temperatura e umidade conectados via ESP32. Aqui está um guia para utilizar o sistema:
        </Text>

        <Text style={styles.texto}>
          <Text style={{ fontWeight: 'bold' }}>Tela Inicial - "Controle seus sensores":{'\n'}</Text>
          Exibe todos os sensores adicionados. Cada cartão mostra o nome do sensor, temperatura, umidade e chance de chuva. Toque em um sensor para abrir sua tela de configurações.
        </Text>

        <Text style={styles.texto}>
          <Text style={{ fontWeight: 'bold' }}>Adicionar novo sensor:{'\n'}</Text>
          Toque no botão "+" na parte inferior da tela. Isso abrirá a lista de sensores disponíveis. Ao selecionar um, será exibida uma notificação de confirmação. Confirmando, ele será adicionado à tela inicial.
        </Text>

        <Text style={styles.texto}>
          <Text style={{ fontWeight: 'bold' }}>Lista de Sensores:{'\n'}</Text>
          Mostra todos os sensores detectados e ainda não configurados. Selecione um da lista para começar o processo de conexão.
        </Text>

        <Text style={styles.texto}>
          <Text style={{ fontWeight: 'bold' }}>Configuração do Sensor:{'\n'}</Text>
          Na tela de configuração, é possível alterar o nome do sensor, registrar a planta monitorada e visualizar dados como temperatura, umidade e chance de chuva. Você também pode definir regras de irrigação (condições, intervalo e tempo).
        </Text>

        <Text style={styles.texto}>
          <Text style={{ fontWeight: 'bold' }}>Controles disponíveis:{'\n'}</Text>
          - <Text style={{ fontWeight: 'bold' }}>Excluir:</Text> remove o sensor do sistema.{'\n'}
          - <Text style={{ fontWeight: 'bold' }}>Irrigar:</Text> aciona manualmente a irrigação.{'\n'}
          - <Text style={{ fontWeight: 'bold' }}>Salvar:</Text> aplica as alterações feitas no sensor.
        </Text>

        <Text style={styles.texto}>
          <Text style={{ fontWeight: 'bold' }}>Outros Botões:{'\n'}</Text>
          - <Text style={{ fontWeight: 'bold' }}>Home:</Text> retorna à tela principal.{'\n'}
          - <Text style={{ fontWeight: 'bold' }}>?:</Text> exibe esta tela de ajuda.
        </Text>

        <Text style={styles.texto}>
          Em caso de problemas com sensores, verifique se o ESP32 está corretamente alimentado, conectado ao Wi-Fi e configurado para enviar os dados corretamente.
        </Text>
      </ScrollView>

      {/* Rodapé fixo */}
      <View style={styles.rodape}>
        <TouchableOpacity style={styles.btn} onPress={() => router.push('/adicionar')}>
          <Text style={styles.btnText}>Adicionar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => router.push('/home')}>
          <Text style={styles.btnText}>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Help;

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
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
    fontSize: 16,
    color: '#000',
    lineHeight: 22,
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
    marginBottom: 60,
  },
 btn: {
    width: 30,
    height: 30,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    width: 100
  },
  btnText: {
    color: '#2E5939',
    fontWeight: 'bold',
  },
});

