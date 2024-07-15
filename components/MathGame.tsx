import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const MathGame = ({ difficulty, onBack }: { difficulty: Difficulty, onBack: () => void }) => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [answer, setAnswer] = useState('');
  const [submittedAnswer, setSubmittedAnswer] = useState<string | null>(null);

  useEffect(() => {
    const loadNumbers = async () => {
      const storedNumbers = await AsyncStorage.getItem('numbers');
      const storedDifficulty = await AsyncStorage.getItem('difficulty');
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

  const handleAnswerSubmit = () => {
    const sum = calculateSum(numbers);
    const isCorrect = sum === parseInt(answer);
    AsyncStorage.setItem('lastResult', JSON.stringify(isCorrect));
    setSubmittedAnswer(answer);
    setAnswer('');
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
      {submittedAnswer !== null && (
        <Text style={styles.submittedText}>Respuesta enviada: {submittedAnswer}</Text>
      )}
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