import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react'

const PopUp = ({visible, title, message, onConfirm, onCancel}) => {
  return (
    // <Modal
    //     animationType="fade"
    //     trasparent={true}
    //     visible={visible}
    //     onRequestClose={onCancel}
    // >
    //     <View style={styles.overlay}>
    //     <View style={styles.card}>
    //       <Text style={styles.title}>{title}</Text>
    //       <Text>{message}</Text>

    //       <View style={styles.buttonRow}>
    //         <TouchableOpacity onPress={onConfirm} style={styles.confirmButton}>
    //           <Text style={styles.buttonText}>Sim</Text>
    //         </TouchableOpacity>
    //         <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
    //           <Text style={styles.buttonText}>Não</Text>
    //         </TouchableOpacity>
    //       </View>
    //     </View>
    //   </View>
    // </Modal>
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={onCancel}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onConfirm}>
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default PopUp

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   card: {
//     width: '80%',
//     backgroundColor: 'white',
//     padding: 25,
//     borderRadius: 8,
//     elevation: 5,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     marginTop: 20,
//     justifyContent: 'flex-end',
//   },
//   confirmButton: {
//     backgroundColor: '#ff4d4d',
//     padding: 10,
//     borderRadius: 5,
//     marginRight: 10,
//   },
//   cancelButton: {
//     backgroundColor: '#ccc',
//     padding: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: 'white',
//   },
// });
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    backgroundColor: '#2E5939',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});