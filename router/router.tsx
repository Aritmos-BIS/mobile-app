import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import AppStack from "./AppStack";
import AuthStack from './AuthStack';


function Router() {

  return (
    <NavigationContainer style={styles.container}>
      <AppStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7B2CBF"
  }
});

export default Router;
