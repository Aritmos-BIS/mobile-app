import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

const BattlePage = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>¡Ya estás en la batalla!</Text>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>¿Todo listo para participar en la batalla?</Text>
        </View>
        <TouchableOpacity style={styles.enterButtonStyle} onPress={() => navigation.navigate('Game')}>
          <Text style={styles.buttonText}>Si</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.exitButtonStyle} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Aun no</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              Atención, estás a punto de salir de la batalla, ¿estás seguro? No podrás participar si te quedas fuera.
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.closeButton, styles.exitButton]}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.exitButtonText}>Salir de la batalla</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#10002B',
    padding: 20,
  },
  container: {
    backgroundColor: '#7B2CBF',
    padding: 20,
    width: 300,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  infoContainer: {
    marginVertical: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 24,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  enterButtonStyle: {
    backgroundColor: '#00FF00',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  exitButtonStyle: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#2C003E',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#E0AAFF',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    marginBottom: 10,
  },
  exitButton: {
    backgroundColor: '#FF0000',
    marginTop: 10,
  },
  exitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BattlePage;
