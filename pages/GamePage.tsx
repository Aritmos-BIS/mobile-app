import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Student } from '../types/user.type';

type Difficulty = 'Fácil' | 'Medio' | 'Difícil';

const generateNumbers = (difficulty: Difficulty): number[] => {
  const num1 = Math.floor(Math.random() * 30) + 1;
  const num2 = Math.floor(Math.random() * 30) + 1;
  const num3 = Math.floor(Math.random() * 30) + 1;
  const num4 = Math.floor(Math.random() * 30) + 1;

  switch (difficulty) {
    case 'Fácil':
      return [num1, num2];
    case 'Medio':
      return [num1, num2, num3];
    case 'Difícil':
      return [num1, num2, num3, num4];
    default:
      return [];
  }
};

const calculateSum = (numbers: number[]): number => {
  return numbers.reduce((acc, curr) => acc + curr, 0);
};

const GamePage = ({ difficulty, data }: { difficulty: Difficulty, data: Student | undefined }) => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [answer, setAnswer] = useState('');
  const [submittedAnswer, setSubmittedAnswer] = useState<string | null>(null);
  const [turn, setTurn] = useState<number>(1);

  useEffect(() => {
    const loadNumbers = async () => {
      const storedNumbers = await AsyncStorage.getItem('numbers');
      const storedDifficulty = await AsyncStorage.getItem('difficulty');
      const storedTurn = await AsyncStorage.getItem('turn');

      if (storedTurn) {
        setTurn(parseInt(storedTurn));
      }

      if (storedNumbers && storedDifficulty === difficulty) {
        setNumbers(JSON.parse(storedNumbers));
      } else {
        generateNewNumbers(difficulty);
      }
    };
    loadNumbers();
  }, [difficulty]);

  const generateNewNumbers = (difficulty: Difficulty) => {
    const newNumbers = generateNumbers(difficulty);
    setNumbers(newNumbers);
    AsyncStorage.setItem('numbers', JSON.stringify(newNumbers));
    AsyncStorage.setItem('difficulty', difficulty);
  };

  const handleAnswerSubmit = async () => {
    const sum = calculateSum(numbers);
    const isCorrect = sum === parseInt(answer);
    setSubmittedAnswer(answer);
    setAnswer('');

    const payload = {
      playerId: data?.id,
      turn,
      correct: isCorrect,
      level: difficulty
    };

    try {
      await axios.put('https://aritmos-salvador511s-projects.vercel.app/api/battle/answer', payload);
      console.log('Respuesta enviada correctamente');
    } catch (error) {
      console.error('Error al enviar la respuesta:', error);
    }

    // Incrementar el turno y guardar en AsyncStorage
    const newTurn = turn + 1;
    setTurn(newTurn);
    await AsyncStorage.setItem('turn', newTurn.toString());

    generateNewNumbers(difficulty);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Resuelve: {numbers.join(' + ')}</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe tu respuesta"
        value={answer}
        keyboardType='decimal-pad'
        onChangeText={setAnswer}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleAnswerSubmit}
        >
          <Text style={styles.buttonText}>Enviar Respuesta</Text>
        </TouchableOpacity>
      </View>
      {submittedAnswer !== null && (
        <Text style={styles.submittedText}>Respuesta enviada: {submittedAnswer}</Text>
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
  buttonStyle: {
    backgroundColor: '#E0AAFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  backButton: {
    marginLeft: 10,
    backgroundColor: '#FF6347',
  },
  submitButton: {
    marginLeft: 10,
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
  input: {
    height: 60,
    textAlign: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#fff',
    margin: 10,
    padding: 10,
    width: '80%',
    backgroundColor: '#C77DFF',
    fontSize: 20,
  },
  submittedText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
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
