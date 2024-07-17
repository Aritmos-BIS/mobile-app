import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Student } from '../types/user.type';
import AppLoader from '../pages/AppLoader';

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

const MathGame = ({ difficulty, data }: { difficulty: Difficulty, data: Student | undefined }) => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [answer, setAnswer] = useState('');
  const [submittedAnswer, setSubmittedAnswer] = useState<string | null>(null);
  const [turn, setTurn] = useState<number>(0);
  const [waiting, setWaiting] = useState <boolean>(false)

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
  }, [difficulty, data]);

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
    console.log({data})

    const payload = {
      playerId: data?.id,
      turn,
      correct: isCorrect,
      level: difficulty
    };

    console.log({payload})

    try {
      const response = await fetch('http://localhost:3000/api/battle/answer', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      const _data = await response.json();
      console.log('Respuesta enviada correctamente', {_data});
      handleWait()
    } catch (error) {
      console.error('Error al enviar la respuesta:', error);
    }

    const newTurn = turn + 1;
    setTurn(newTurn);
    await AsyncStorage.setItem('turn', newTurn.toString());

    generateNewNumbers(difficulty);
  };

  const handleWait = async () => {
    setWaiting(true)
      
    const checkTurns = async () => {
      const response = await fetch('http://localhost:3000/api/battle/answer');
      const _data = await response.json();
      
      if (_data.answerPlayer1.turn === _data.answerPlayer2.turn) {
        setWaiting(false);
      } else {
        setTimeout(checkTurns, 1000);  
      }
    };
  
    checkTurns();
  };

  if (waiting) {
    return (
      <Modal>
        <AppLoader></AppLoader>
      </Modal>
    )
  }

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
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  submitButton: {
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
  submittedText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 20,
  },
});

export default MathGame;