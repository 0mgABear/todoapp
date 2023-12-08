import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";

import config from "../config";

const DATA_KEY = "TODOAPP_DATA";

export default function EntryInput({ navigation }) {
  const [input, setInput] = useState("");

  function handleInput(text) {
    setInput(text);
  }

  async function addEntry() {
    if (input === "") return;
    let entries = [];
    try {
      entries = await AsyncStorage.getItem(config.DATA_KEY);
    } catch (error) {}

    if (entries) {
      entries = JSON.parse(entries);
      entries = [...entries, input];
    } else {
      entries = [input];
    }

    entries = JSON.stringify(entries);

    try {
      await AsyncStorage.setItem(config.DATA_KEY, entries);
    } catch (e) {
      Alert.alert("Error", "Failed to save todo");
    }
    setInput("");
    navigation.navigate("EntryListing");
  }
  //   return data.map((entry, index) => {
  //     return (
  //       <View key={index} style={styles.entryContainer}>
  //         <Text style={styles.entryText}>
  //           {index + 1}. {entry}
  //         </Text>
  //         <Button
  //           title="Delete"
  //           onPress={() => {
  //             Alert.alert("Todo", "are you sure you want to delete?", [
  //               { text: "YES" },
  //               { text: "NO" },
  //             ]);
  //           }}
  //         />
  //       </View>
  //     );
  //   });
  // };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behaviour={Platform.OS === "ios" ? "padding" : null}
    >
      <StatusBar style="auto" />
      <TextInput
        style={styles.textInput}
        value={input}
        onChangeText={handleInput}
        multiline={true}
        placeholder="NEW TODO ENTRY"
        autoFocus={true}
      />
      <Button title="Add" onPress={addEntry} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e8e8",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    borderWidth: 1,
    width: "90%",
    padding: 5,
  },
  entryButton: {
    flex: 1,
    justifyContent: "center",
  },
});
