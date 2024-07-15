import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import useAuth from "../hooks/useAuth";
import StatusPageTest from '../components/PageTest';
const Router: React.FC = () => {
  const { user } = useAuth();

  return (
    // para que prueben pageTest y las vistas
    /*<NavigationContainer>
      <StatusPageTest />
    </NavigationContainer>*/
    <NavigationContainer>
      {user != undefined ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default Router;
