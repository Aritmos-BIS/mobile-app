import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';

const GamePage = () => {

  useFocusEffect(
    React.useCallback(() => {
      const lockOrientation = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      };

      lockOrientation();

      return () => {
        ScreenOrientation.unlockAsync();
      };
    }, [])
  );

  const [modalVisible, setModalVisible] = React.useState(false);


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
});

export default GamePage;
