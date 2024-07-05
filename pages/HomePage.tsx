// pages/HomePage.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TournamentPage from './TournamentPage';

const HomePage = ({ navigation }) => {

  const activeTournamentTest = true;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        {activeTournamentTest ? (
          <>
            <Text style={styles.title}>Torneo Activo</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Grupo: prueba</Text>
              <Text style={styles.label}>Prof: prueba</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Participantes: 999</Text>
            </View>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => navigation.navigate("Tournament")}
            >
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.title}>No hay torneos activos</Text>
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
