import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import demoService from '../services/demoService'
import { Student } from '../types/user.type'
import useAuth from '../hooks/useAuth';

export function ProfilePage() {
  const { logout, loading } = useAuth();
  const [_loading, setLoading] = useState(true);
  const [data, setData] = useState<Student | undefined>(undefined);

  useEffect(() => {
    handleLoad()
  }, [])
  useEffect(() => {
    console.log({ data })
  }, [data])

  const handleLogOut = () => {
    logout()
  }

  const handleLoad = async () => {
    setLoading(true)
    const _data = await demoService()
    setData(_data)
    setLoading(false)
  };

  if (loading || _loading) {
    return (
      <View style={styles.maincontainer}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.maincontainer}>
      <View style={styles.profileContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Perfil de {data?.name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.textInfo}>Name: {data?.name}</Text>
          <Text style={styles.textInfo}>Group: {data?.group.name}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogOut} >
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