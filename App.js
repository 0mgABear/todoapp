import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);

  const handleInput = (text) => {
    console.log(text);
    setInput(text);
  };

  const addEntry = () => {
    setData([...data, input]);
    setInput("");
  };

  const renderEntries = () => {
    return data.map((entry, index) => {
      return (
        <View key={index} style={styles.entryContainer}>
          <Text style={styles.entryText}>
            {index + 1}. {entry}
          </Text>
          <Button
            title="Delete"
            onPress={() => {
              Alert.alert("Todo", "are you sure you want to delete?", [
                { text: "YES" },
                { text: "NO" },
              ]);
            }}
          />
        </View>
      );
    });
  };

  const renderEntry = ({ item, index }) => {
    return (
      <View key={index} style={styles.entryContainer}>
        <Text style={styles.entryText}>
          {index + 1}. {item}
        </Text>
        <Button
          onPress={() => {
            Alert.alert("Todo", "Are you sure you want to delete?", [
              {
                text: "YES",
                onPress: () => {
                  deleteEntry(index);
                },
              },
              { text: "NO" },
            ]);
          }}
          title="Delete"
        />
      </View>
    );
  };

  const deleteEntry = (index) => {
    const newData = [...data.slice(0, index), ...data.slice(index + 1)];
    setData(newData);
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Todo Entry:</Text>
      <TextInput
        style={styles.textInput}
        value={input}
        onChangeText={handleInput}
      />
      <Button title="Add" onPress={addEntry} />
      <FlatList
        style={styles.scrollView}
        data={data}
        renderItem={renderEntry}
      />
      {/* <ScrollView style={styles.scrollView}>{renderEntries()}</ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    borderWidth: 1,
    width: "90%",
    height: 40,
    padding: 5,
  },
  entryText: { padding: 10 },
  entryContainer: {
    flexDirection: "row",
  },
  scrollView: {
    width: "80%",
    maxHeight: "60%",
  },
});
