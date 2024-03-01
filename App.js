import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./screens/Login";
import Chats from "./screens/Chats";
import IndividualChat from "./screens/IndividualChat";
import Register from "./screens/Register";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chats"
          component={Chats}
          options={{ headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="Individual Chat"
          component={IndividualChat}
          options={({ route }) => ({
            title: route.params.username,
            headerTitleAlign: "center",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );``
}
