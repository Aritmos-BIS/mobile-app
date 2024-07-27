import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TournamentPage from './TournamentPage';
import { apiFetch } from '../libs/request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoader from './AppLoader';
import { Student } from '../types/user.type';

const HomePage = ({ navigation }) => {
  const [activeBattle, setActiveBattle] = useState(false)
  const [loading, setLoading] = useState(false)
  const [studentData, setStudentData] = useState<Student | undefined>(undefined);
  const [data, setData] = useState({})

  useEffect(() => {
    const loadStudentData = async () => {
      const _data = await AsyncStorage.getItem('@user');
      if (_data) {
        setStudentData(JSON.parse(_data));
      }
    };

    loadStudentData();
  }, [])

  useEffect(() => {
    const checkBattle = async () => {
      if (studentData) {
        await handleCheckBattle()
      }
    }

    checkBattle()

  }, [studentData])


  const handleCheckBattle = async () => {

    console.log({ studentData })

    const response = await apiFetch({ method: 'GET' }, `http://localhost:3000/api/battle/activeBattle/${studentData?.id}`)
    setData(response)


    if (response.activeBattle) {
      setActiveBattle(true)
    } else {
      setActiveBattle(false)
    }

    setTimeout(async () => { await handleCheckBattle() }, 2000)

  }

  if (loading) {
    return <AppLoader />
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        {activeBattle ? (
          <>
            <Text style={styles.title}>Batalla Activa</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Jugador 1: {data?.player1}</Text>
              <Text style={styles.label}>Jugador 2: {data?.player2}</Text>
            </View>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => navigation.navigate("Tournament")}
            >
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.title}>No hay batallas activas</Text>
            <Text style={styles.buttonText}>Espera a que tu profesor inicie la batalla</Text>
            {/* <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => handleCheckBattle()}>
              <Text style={styles.buttonText}>Buscar</Text>
            </TouchableOpacity> */}
          </>

        )}
      </View>
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
    width: 300,
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
});

export default HomePage;
