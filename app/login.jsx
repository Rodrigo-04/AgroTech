import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image, Modal, Pressable } from 'react-native';
import { get, ref } from 'firebase/database';
import { db } from './database/firebaseConfig';
import { useRouter } from 'expo-router';
import Logo from '../assets/img/Logo.svg';

const Login = () => {
  const router = useRouter();
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const abrirModal = (title, message, onConfirm = () => setModalVisible(false)) => {
    setModalData({ title, message, onConfirm });
    setModalVisible(true);
  };

  const handleLogin = async () => {
    if (!usuario || !senha) {
      abrirModal('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const userRef = ref(db, `config/${usuario}`);
      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        abrirModal('Erro', 'Usuário não encontrado.');
        return;
      }

      const dados = snapshot.val();

      if (!dados.user_passwd) {
        abrirModal('Erro', 'Senha não configurada para este usuário.');
        return;
      }

      if (dados.user_passwd === senha) {
          router.replace('/home');
      } else {
        abrirModal('Erro', 'Senha incorreta.');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      abrirModal('Erro', 'Ocorreu um problema na tentativa de login.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.title}>AgroTech Login</Text>
        <Text style={styles.subtitle}>Entre com seu Usuário e Senha</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={usuario}
        onChangeText={setUsuario}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Modal customizado */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>{modalData.title}</Text>
            <Text style={styles.modalMessage}>{modalData.message}</Text>
            <Pressable style={styles.modalButton} onPress={modalData.onConfirm}>
              <Text style={styles.modalButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECFFD4',
    position: 'relative',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E5939',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#2E5939',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // Estilos do Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E5939',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#444',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#2E5939',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});