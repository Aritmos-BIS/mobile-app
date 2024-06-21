import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import useAuth from '../hooks/useAuth';

export function ProfilePage({route}) {
  const { data } = route.params;
  const logout = useAuth();

    return (
        <View style={styles.maincontainer}>
          <View style={styles.profileContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Perfil de {data?.name}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.textInfo}>Name: {data?.name}</Text>
              <Text style={styles.textInfo}>Group: {data?.group}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.logoutBtn} onPress= {logout} >
            <Text style={styles.logoutText}>Salir</Text>
          </TouchableOpacity>
        </View>
      );
    }

    const styles = StyleSheet.create({
        maincontainer: {
          flex: 1,
          backgroundColor: '#240046',
          alignItems: 'center',
          justifyContent: 'center',
        },
        profileContainer: {
          width: '70%',
          height: '70%',
          backgroundColor: '#7B2CBF',
          borderRadius: 15,
        },
        titleContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        infoContainer: {
          flex: 2,
          justifyContent: 'space-evenly',
          alignItems: 'center',
        },
        title: {
          fontSize: 24,
          fontWeight: 'bold',
          color: 'white',
        },
        textInfo: {
          fontSize: 18,
          color: 'white',
        },
        logoutBtn: {
          width: '50%',
          height: '10%',
          backgroundColor: 'red',
          borderRadius: 10,
        },
        logoutText: {
          fontSize: 18,
          color: 'white',
        },
      });
      
      export default ProfilePage;