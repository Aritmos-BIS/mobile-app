import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import AppStack from "./AppStack";
import AuthStack from './AuthStack';


function Router() {

  return (
    <NavigationContainer style={styles.container}>
      <AuthStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#708090"
  }
});

export default Router;
