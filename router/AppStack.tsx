import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Button, StyleSheet } from "react-native";
import HomePage from "../pages/HomePage";

const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{ title: 'Inicio' }}
      />
      { }
    </Stack.Navigator>
  );
}

export default AppStack;
