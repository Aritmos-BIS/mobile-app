import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Student } from '../types/user.type';
import AppLoader from '../pages/AppLoader';
import StatusPage from './Status';
import { apiFetch } from '../libs/request';
import ResultPage from './Result';

type Difficulty = 'easy' | 'medium' | 'hard';
type Status = 'correct' | 'incorrect' | 'waiting' | null
type Result = 'winner' | 'loser' | null

const generateNumbers = (difficulty: Difficulty): number[] => {
  const num1 = Math.floor(Math.random() * 30) + 1;
  const num2 = Math.floor(Math.random() * 30) + 1;
  const num3 = Math.floor(Math.random() * 30) + 1;
  const num4 = Math.floor(Math.random() * 30) + 1;

  switch (difficulty) {
    case 'easy':
      return [num1, num2];
    case 'medium':
      return [num1, num2, num3];
    case 'hard':
      return [num1, num2, num3, num4];
    default:
      return [];
  }
};

const calculateSum = (numbers: number[]): number => {
  return numbers.reduce((acc, curr) => acc + curr, 0);
};

const MathGame = ({ difficulty, data, onBack }: { difficulty: Difficulty, data: Student | undefined, onBack: () => void }) => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [answer, setAnswer] = useState('');
  const [submittedAnswer, setSubmittedAnswer] = useState<string | null>(null);
  const [turn, setTurn] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [status, setStatus] = useState<Status>(null);
  const [result, setResult] = useState<Result>(null)

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
    const _result = sum === parseInt(answer);
    setIsCorrect(_result);
    setSubmittedAnswer(answer);
    setAnswer('');

    const newTurn = turn + 1;
    setTurn(newTurn);
    await AsyncStorage.setItem('turn', newTurn.toString());

    generateNewNumbers(difficulty);
  };

  useEffect(() => {
    const submitResult = async () => {
      if (submittedAnswer !== null) {
        const payload = {
          playerId: data?.id,
          turn: turn - 1,
          correct: isCorrect,
          level: difficulty
        };

        console.log({ payload });

        try {
          const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/battle/answer`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
          });
          const _data = await response.json();
          console.log('Respuesta enviada correctamente', { _data });
          handleWait();
        } catch (error) {
          console.error('Error al enviar la respuesta:', error);
        }
      }
    };

    submitResult();
  }, [submittedAnswer]);


  const handleCheckWinner = async () => {
    const response = await apiFetch({ method: 'GET' }, '/api/battle/winner')
    if (response?.winnerId) {
      setStatus(null)
      setResult(response.winnerId == data?.id ? 'winner' : 'loser')
    }else{
      setTimeout(async () => {
        await handleCheckWinner()
      }, 2000);
    }
  }

  const handleWait = async () => {
    setStatus('waiting');

    const checkTurns = async () => {
      const _data = await apiFetch({ method: 'GET' }, '/api/battle/answer')

      if (_data.answerPlayer1.turn === _data.answerPlayer2.turn) {
        setStatus(isCorrect ? 'correct' : 'incorrect')
        setTimeout(() => {
          setStatus(null);
          handleCheckWinner()
        }, 4000)
      } else {
        setTimeout(checkTurns, 1000);
      }
    };

    checkTurns();
  };

  if (status != null) {
    return (
      <Modal>
        <StatusPage status={status} />
      </Modal>
    )
  }

  if (result != null) {
    return (
      <Modal>
        <ResultPage result={result} />
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
          style={[styles.submitButton, styles.backButton]}
          onPress={onBack}
        >
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleAnswerSubmit}
        >
          <Text style={styles.buttonText}>Enviar Respuesta</Text>
        </TouchableOpacity>
      </View>
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
  backButton: {
    backgroundColor: '#FF6347',
    marginLeft: 10,
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
