import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';

interface StatusProps {
  status: 'correct' | 'incorrect' | 'waiting';
}

const StatusPage: React.FC<StatusProps> = ({ status }) => {
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

  const renderContent = () => {
    switch (status) {
      case 'correct':
        return (
          <View style={styles.correct}>
            <Text style={styles.label}>¡Respuesta Correcta!</Text>
            <Image
              source={require('../assets/correct.gif')}
              style={styles.imageStyle}
              resizeMode="contain"
            />
          </View>
        );
      case 'incorrect':
        return (
          <View style={styles.incorrect}>
            <Text style={styles.label}>Respuesta Incorrecta</Text>
            <Image
              source={require('../assets/wrong.gif')}
              style={styles.imageStyle}
              resizeMode="contain"
            />
          </View>
        );
      case 'waiting':
        return (
          <View style={styles.waiting}>
            <Text style={styles.label}>Esperando a que el contrincante conteste...</Text>
            <Image
              source={require('../assets/ariLoading.gif')}
              style={styles.imageStyle}
              resizeMode="contain"
            />
          </View>
        );
      default:
        return null;
    }
  };

  return <View style={styles.mainContainer}>{renderContent()}</View>;
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#10002B',
    padding: 20,
  },
  correct: {
    backgroundColor: '#7ed957',
    padding: 20,
    width: 400,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    alignItems: 'center',
  },
  incorrect: {
    backgroundColor: '#ea5951',
    padding: 20,
    width: 400,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    alignItems: 'center',
  },
  waiting: {
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
});

export default StatusPage;
