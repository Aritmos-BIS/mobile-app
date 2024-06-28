// router/AppStack.tsx
import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "react-native";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import TournamentPage from "../pages/TournamentPage";
import CameraPage from '../pages/CameraPage';

const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: '#5A189A',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <Button
              title="Perfil"
              onPress={() => navigation.navigate('Profile')}
            />
          ),
        })}
        name="Home"
        component={HomePage}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: '#5A189A',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        name="Profile"
        component={ProfilePage}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: '#5A189A',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        name="Tournament"
        component={TournamentPage}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: '#5A189A',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        name="Camera"
        component={CameraPage}
      />
    </Stack.Navigator>
  );
}

export default AppStack;
