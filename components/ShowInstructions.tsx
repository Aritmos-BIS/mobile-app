import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const ShowInstructions = ({ onNext }) => {
  const [waitingModal, setWaitingModal] = useState(false);

  const handleNext = async () => {
    setWaitingModal(true);

    // Simulación de proceso en segundo plano
    await new Promise(resolve => setTimeout(resolve, 2000));

    setWaitingModal(false);
    onNext();
  };

  const closeModal = () => {
    setWaitingModal(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Coloca tu tarjeta de monstruo favorita sobre el tablero</Text>
      <Image
        style={styles.imageStyle}
        source={require('../assets/sensorAnim.gif')}
        resizeMode="contain"
      />
      <TouchableOpacity
        style={[styles.buttonStyle, styles.exitButton]}
        onPress={handleNext}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

      {/* Modal de espera */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={waitingModal}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Esperando proceso en segundo plano...</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7B2CBF',
    padding: 20,
    width: 400,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: 200,
    height: 200,
  },
  label: {
    fontSize: 24,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonStyle: {
    backgroundColor: '#E0AAFF',
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
  exitButton: {
    backgroundColor: '#FF0000',
    marginTop: 10,
  },
  // Estilos para la modal de espera
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default ShowInstructions;
