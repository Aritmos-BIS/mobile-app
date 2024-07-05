import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ScrollView, Image } from 'react-native';
import { Student } from '../types/user.type';
import useAuth from '../hooks/useAuth';
import { useNavigation, NavigationProp, useFocusEffect  } from '@react-navigation/native';
import { getProfile } from '../services/profileService';

type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Tournament: undefined;
  Camera: undefined;
};

export function ProfilePage() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { logout, loading } = useAuth();
  const [_loading, setLoading] = useState(true);
  const [data, setData] = useState<Student | undefined>(undefined);

  useFocusEffect(
    useCallback(() => {
      handleLoad();
    }, [])
  );

  useEffect(() => {
    console.log({ data });
  }, [data]);

  const handleLogOut = () => {
    logout();
  };

  const handleLoad = async () => {
    setLoading(true);
    const _data = await getProfile();
    setData(_data);
    setLoading(false);
  };

  if (loading || _loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.profileContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Perfil de {data?.name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Image style={styles.imageFormat} source={data?.urlImage == "" ? require('../assets/ProfilePic.png') : {uri: data?.urlImage}} />
          <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('Camera')}>
            <Text style={styles.buttonText}>Change photo</Text>
          </TouchableOpacity>
          <Text style={styles.textInfo}>Name: {data?.name}</Text>
          <Text style={styles.textInfo}>Group: {data?.group.name}</Text>
        </View>
      </View>
      <View style={styles.statusContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Stats</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.textInfo}>Torneos ganados: 1</Text>
          <Text style={styles.textInfo}>Victorias: {data?.numberWins}</Text>
          <Text style={styles.textInfo}>Torneos jugados: 1</Text>
          <Text style={styles.textInfo}>Monstruo favorito:</Text>
          <Image style={styles.imageFormat} source={require('../assets/axo.png')} />
        </View>
      </View>
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogOut}>
        <Text style={styles.logoutText}>Cerrar sesion</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: '#10002B',
  },
  profileContainer: {
    width: '100%',
    backgroundColor: '#7B2CBF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  titleContainer: {
    marginBottom: 10,
  },
  infoContainer: {
    alignItems:'center',
    marginVertical: 10,
  },
  imageFormat: {
    width: 150,
    height: 150,
    padding: 20,
    marginTop: 20,
    marginBottom: 5,
    borderRadius: 75
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  textInfo: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  buttonText:{
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
  editBtn:{
    backgroundColor: '#C77DFF',
    width: 'auto',
    height: 'auto',
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
  },
  statusContainer: {
    width: '100%',
    backgroundColor: '#9D4EDD',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  logoutBtn: {
    width: '100%',
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 18,
    color: 'white',
  },
});

export default ProfilePage;