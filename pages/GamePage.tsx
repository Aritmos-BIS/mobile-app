import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

const GamePage = () => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    };

    lockOrientation();

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/axo.png')}
          resizeMode="contain"
        />
        <Image
          source={require('../assets/axo.png')}
          resizeMode="contain"
        />
      </View>
      <View>
        <TouchableOpacity style={styles.buttonStyle} onPress={() => setModalVisible(true)} >
          <Text style={styles.buttonText}>nivel</Text>
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
            <TouchableOpacity
              style={styles.easyBtn}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.buttonText}>Facil</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.mediumBtn}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.buttonText}>Medio</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.hardBtn}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.buttonText}>Dificl</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>

  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

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
    width: 400,
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
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
  easyBtn: {
    backgroundColor: '#7ed957',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    marginBottom: 10,
  },
  mediumBtn: {
    backgroundColor: '#f5b45b',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    marginBottom: 10,
  },
  hardBtn: {
    backgroundColor: '#ea5951',
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

export default GamePage;
