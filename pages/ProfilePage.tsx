import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Modal } from 'react-native';
import { Student } from '../types/user.type';
import useAuth from '../hooks/useAuth';
import { useNavigation, NavigationProp, useFocusEffect } from '@react-navigation/native';
import AppLoader from './AppLoader';
import { getProfile } from '../services/profileService';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Tournament: undefined;
  Camera: undefined;
};

const arimalOptions = [
  { id: 1, source: require('../assets/axo.png') },
  { id: 2, source: require('../assets/monarch.png') },
  { id: 3, source: require('../assets/cacti.png') },
];

export function ProfilePage() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { logout, loading } = useAuth();
  const [_loading, setLoading] = useState(true);
  const [data, setData] = useState<Student | undefined>(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  const [favoriteArimal, setFavoriteArimal] = useState<number | null>(null);

  useFocusEffect(
    useCallback(() => {
      handleLoad();
    }, [])
  );

  useEffect(() => {
    console.log({ data });
    loadFavoriteArimal();
  }, [data]);

  const handleLogOut = () => {
    logout();
  };

  const handleLoad = async () => {
    setLoading(true);
    const _data = await getProfile();
    await AsyncStorage.setItem("@user", JSON.stringify(_data));
    setData(_data);
    setLoading(false);
  };

  const loadFavoriteArimal = async () => {
    const arimalId = await AsyncStorage.getItem("@favoriteArimal");
    if (arimalId) {
      setFavoriteArimal(parseInt(arimalId, 10));
    }
  };

  const handleSelectFavoriteArimal = async (id: number) => {
    setFavoriteArimal(id);
    await AsyncStorage.setItem("@favoriteArimal", id.toString());
    setModalVisible(false);
  };

  if (loading || _loading) {
    return (
      <View style={styles.loadingContainer}>
        <AppLoader />
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
          <Image style={styles.imageFormat} source={data?.urlImage == "" ? require('../assets/ProfilePic.png') : { uri: data?.urlImage }} />
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
          <Text style={styles.textInfo}>Victorias: {data?.numberWins}</Text>
          <Text style={styles.textInfo}>Arimal favorito:</Text>
          {favoriteArimal !== null && (
            <Image style={styles.imageContainer} source={arimalOptions.find(option => option.id === favoriteArimal)?.source} />
          )}
          <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Cambiar Arimal</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogOut}>
        <Text style={styles.logoutText}>Cerrar sesion</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecciona tu Arimal favorito</Text>
            <View style={styles.arimalOptionsContainer}>
              {arimalOptions.map(option => (
                <TouchableOpacity key={option.id} onPress={() => handleSelectFavoriteArimal(option.id)}>
                  <Image style={styles.arimalImage} source={option.source} />
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    backgroundColor: '#10002B',
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
    alignItems: 'center',
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
  imageContainer: {
    width: 150,
    height: 150,
    padding: 20,
    marginTop: 20,
    marginBottom: 5,
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
  buttonText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
  editBtn: {
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#10002bCC',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#240046',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e0aaff',
    marginBottom: 20,
  },
  arimalOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  arimalImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  closeBtn: {
    backgroundColor: '#7b2cbf',
    borderRadius: 10,
    padding: 10,
  },
});

export default ProfilePage;