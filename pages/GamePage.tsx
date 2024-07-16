import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import MathGame from '../components/MathGame';
import ShowInstructions from '../components/ShowInstructions';

// Componente Timer
const Timer = ({ seconds }) => (
  <View style={styles.timerContainer}>
    <Text style={styles.timerText}>{seconds}s</Text>
  </View>
);

// Componente principal GamePage
const GamePage = () => {
  const [showInstruction, setShowInstruction] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [seconds, setSeconds] = useState(60);
  const [timerActive, setTimerActive] = useState(false);

  // Hook para bloquear la orientación de la pantalla en landscape al entrar en la vista
  useFocusEffect(
    React.useCallback(() => {
      const lockOrientation = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      };

      const unlockOrientation = async () => {
        await ScreenOrientation.unlockAsync();
      };

      lockOrientation();

      return () => {
        unlockOrientation();
      };
    }, [])
  );

  // Hook para manejar el temporizador
  useEffect(() => {
    let interval = null;
    if (timerActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, seconds]);

  // Funcion para cambiar de showinstructions a coloca tu tarjeta a seleccion de dificultad
  const handleNext = () => {
    setShowInstruction(false);
    setModalVisible(true);
  };

  // Función para manejar la selección de la dificultad
  const handleDifficulty = (selectedDifficulty) => {
    setModalVisible(false);
    setDifficulty(selectedDifficulty);
    setTimerActive(true);
  };

  // Función para volver a la selección de dificultad
  const handleBackToDifficultySelection = () => {
    setDifficulty(null);
    setModalVisible(true);
    setTimerActive(false);
  };

  // Función para estilo dificultad
  const getDifficultyStyle = () => {
    switch (difficulty) {
      case 'Fácil':
        return { backgroundColor: '#7ed957' };
      case 'Medio':
        return { backgroundColor: '#f5b45b' };
      case 'Difícil':
        return { backgroundColor: '#ea5951' };
      default:
        return { backgroundColor: '#fff' };
    }
  };

  return (
    <View style={styles.mainContainer}>
      {!showInstruction && timerActive && <Timer seconds={seconds} />}
      {difficulty ? (
        <>
          <Text style={[styles.labelDifficulty, getDifficultyStyle()]}>{difficulty}</Text>
          <MathGame difficulty={difficulty} onBack={handleBackToDifficultySelection} />
        </>
      ) : (
        <>
          {showInstruction ? (
            <ShowInstructions onNext={handleNext} />
          ) : (
            <View style={styles.mainContainer}>
              <Timer seconds={seconds} />
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
              {/* Modal de espera */}
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
                      onPress={() => handleDifficulty('Fácil')}
                    >
                      <Text style={styles.buttonText}>Fácil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.mediumBtn}
                      onPress={() => handleDifficulty('Medio')}
                    >
                      <Text style={styles.buttonText}>Medio</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.hardBtn}
                      onPress={() => handleDifficulty('Difícil')}
                    >
                      <Text style={styles.buttonText}>Difícil</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          )}
        </>
      )}
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
  labelDifficulty: {
    fontSize: 24,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 25,
    width: 400,
    borderRadius: 10,
    padding: 10,
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
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  // Estilos del temporizador
  timerContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
  },
  timerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GamePage;
jewa