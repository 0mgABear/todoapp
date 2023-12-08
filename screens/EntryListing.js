import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Alert, Button, StyleSheet, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../config";
import { useIsFocused } from "@react-navigation/native";

function EntryListing() {
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      readData();
    }
  }, [isFocused]);

  async function readData() {
    let entries = [];
    try {
      entries = await AsyncStorage.getItem(config.DATA_KEY);
      entries = JSON.parse(entries);
    } catch (error) {}
    setData(entries);
  }

  async function saveData(updatedData) {
    const entries = JSON.stringify(updatedData);
    try {
      await AsyncStorage.setItem(config.DATA_KEY, entires);
    } catch (error) {
      Alert.alert("unable to save the entry. please try again.");
    }
  }

  function deleteEntry(index) {
    const newData = [...data.sllice(0, index), ...data.slice(index + 1)];
    saveData(newData);
    setData(newData);
  }

  function RenderEntry({ item, index }) {
    return (
      <View key={index} style={styles.entryContainer}>
        <Text style={styles.entryText}>
          {index + 1}. {item}
        </Text>
        <View style={styles.entryButton}>
          <Button
            title="Delete"
            onPress={() => {
              Alert.alert("Todo", "Do you want to delete?", [
                {
                  text: "Yes",
                  onPress: () => {
                    deleteEntry(index);
                  },
                },
                {
                  text: "no",
                },
              ]);
            }}
          ></Button>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        style={styles.ScrollViewStyle}
        data={data}
        renderItem={RenderEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  entryText: {
    padding: 10,
    flex: 3,
  },
  entryButton: {
    flex: 1,
    justifyContent: "center",
  },
  entryContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#a4a4a4",
    margin: 5,
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.25,
  },
  scrollViewStyle: {
    width: "80%",
    maxHeight: "60%",
  },
});

export default EntryListing;
