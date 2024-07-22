import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Animated, TouchableOpacity } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect, useNavigation, NavigationProp } from '@react-navigation/native';
import { Student } from '../types/user.type';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ResultProps {
  result: 'winner' | 'loser' | null;
  profileImage: string;
}

const ResultPage: React.FC<ResultProps> = ({ result }) => {
  const winnerHeight = useRef(new Animated.Value(120)).current;
  const loserHeight = useRef(new Animated.Value(120)).current;
  const [showExitButton, setShowExitButton] = useState(false);
  const [data, setData] = useState<Student | undefined > (undefined)
  const navigation = useNavigation<NavigationProp<any>>();

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
        setData(JSON.parse(data));
      }
    };
    loadStudentData();
  }, []);

  useEffect(() => {
    const animations = [];
    if (result === 'winner') {
      animations.push(
        Animated.timing(winnerHeight, {
          toValue: 160,
          duration: 1000,
          useNativeDriver: false,
        })
      );
    } else if (result === 'loser') {
      animations.push(
        Animated.timing(loserHeight, {
          toValue: 80,
          duration: 1000,
          useNativeDriver: false,
        })
      );
    }

    Animated.sequence(animations).start(() => {
      setShowExitButton(true);
    });
  }, [result, winnerHeight, loserHeight]);

  const renderContent = () => {
    switch (result) {
      case 'winner':
        return (
          <View style={styles.container}>
            <Text style={styles.label}>¡Ganaste!</Text>
            <View style={styles.podiumContainer}>
              <View style={styles.column}></View>
              <Animated.View style={[styles.column, styles.winnerColumn, { height: winnerHeight }]}>
                <Image style={styles.imageFormat} source={data?.urlImage == "" ? require('../assets/ProfilePic.png') : { uri: data?.urlImage }} />
                <Text style={styles.columnText}>{data?.name}</Text>
              </Animated.View>
              <View style={styles.column}></View>
            </View>
            {showExitButton && (
              <TouchableOpacity style={styles.exitButton} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.exitButtonText}>Salir</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      case 'loser':
        return (
          <View style={styles.container}>
            <Text style={styles.label}>¡Perdiste!</Text>
            <View style={styles.podiumContainer}>
              <View style={styles.column}></View>
              <Animated.View style={[styles.column, styles.loserColumn, { height: loserHeight }]}>
                <Image style={styles.imageFormat} source={data?.urlImage == "" ? require('../assets/ProfilePic.png') : { uri: data?.urlImage }} />
                <Text style={styles.columnText}>{data?.name}</Text>
              </Animated.View>
              <View style={styles.column}></View>
            </View>
            {showExitButton && (
              <TouchableOpacity style={styles.exitButton} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.exitButtonText}>Salir</Text>
              </TouchableOpacity>
            )}
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
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  podiumContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  column: {
    width: 100,
    height: 120,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  winnerColumn: {
    backgroundColor: '#FFD700',
  },
  loserColumn: {
    backgroundColor: '#ea5951',
  },
  columnText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  imageFormat: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  exitButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  exitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ResultPage;
