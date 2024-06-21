import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Button } from "react-native";
import useAuth from "../hooks/useAuth";
import HomePage from "../pages/HomePage";

const Stack = createNativeStackNavigator();
function AppStack() {
  const { logout } = useAuth();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: '#5A189A',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => <Button title='log out' onPress={logout} />
        }
        }
        name="Home"
        component={HomePage}
      />
    </Stack.Navigator>
  );
}

export default AppStack;
