import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EntryInput from "./screens/EntryInput";
import EntryListing from "./screens/EntryListing";
import IconButton from "./components/IconButton";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="EntryInput" component={EntryInput} />
        <Stack.Screen
          name="EntryListing"
          component={EntryListing}
          options={({ navigation }) => ({
            headerRight: () => (
              <IconButton
                name="add-circle"
                size={24}
                color="#0c0c0c"
                onPress={() => {
                  navigation.navigate("EntryInput");
                }}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
