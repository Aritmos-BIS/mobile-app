import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "../pages/LoginPage";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#5A189A',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;
