import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import MathGame from '../components/MathGame';
import ShowInstructions from '../components/ShowInstructions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Student } from '../types/user.type';

const GamePage = () => {
  const [showInstruction, setShowInstruction] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [studentData, setStudentData] = useState<Student | undefined>(undefined);

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


  useEffect(() => {
    const loadStudentData = async () => {
      const data = await AsyncStorage.getItem('@user');
      if (data) {
        setStudentData(JSON.parse(data));
      }
      await AsyncStorage.setItem('turn', '1');
    };
    loadStudentData();
  }, []);

  const handleNext = () => {
    setShowInstruction(false);
    setModalVisible(true);
  };

  const handleDifficulty = (selectedDifficulty) => {
    setModalVisible(false);
    setDifficulty(selectedDifficulty);
  };

  const handleBackToDifficultySelection = () => {
    setDifficulty(null);
    setModalVisible(true);
  };

  // Función para estilo dificultad
  const getDifficultyStyle = () => {
    switch (difficulty) {
      case 'easy':
        return { backgroundColor: '#7ed957' };
      case 'medium':
        return { backgroundColor: '#f5b45b' };
      case 'hard':
        return { backgroundColor: '#ea5951' };
      default:
        return { backgroundColor: '#fff' };
    }
  };

  return (
    <View style={styles.mainContainer}>
      {!showInstruction}
      {difficulty ? (
        <>
          <Text style={[styles.labelDifficulty, getDifficultyStyle()]}>{difficulty == 'easy' ? 'Fácil' : difficulty == 'medium' ? 'Medio' : 'Difícil'}</Text>

          <MathGame difficulty={difficulty} data={studentData} onBack={handleBackToDifficultySelection} />

        </>
      ) : (
        <>
          {showInstruction ? (
            <ShowInstructions onNext={handleNext} />
          ) : (
            <View style={styles.mainContainer}>
              <View style={styles.imageContainer}>
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
                      onPress={() => handleDifficulty('easy')}
                    >
                      <Text style={styles.buttonText}>Fácil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.mediumBtn}
                      onPress={() => handleDifficulty('medium')}
                    >
                      <Text style={styles.buttonText}>Medio</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.hardBtn}
                      onPress={() => handleDifficulty('hard')}
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
});

export default GamePage;
