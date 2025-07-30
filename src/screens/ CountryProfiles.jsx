import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

const countries = [
  { id: "1", name: "Afghanistan", flag: "https://flagsapi.com/AF/shiny/64.png" },
  { id: "2", name: "Albania", flag: "https://flagsapi.com/AL/shiny/64.png" },
  { id: "3", name: "Algeria", flag: "https://flagsapi.com/DZ/shiny/64.png" },
  { id: "4", name: "Andorra", flag: "https://flagsapi.com/AD/shiny/64.png" },
  { id: "5", name: "Angola", flag: "https://flagsapi.com/AO/shiny/64.png" },
  { id: "6", name: "Antigua and Barbuda", flag: "https://flagsapi.com/AG/shiny/64.png" },
  { id: "7", name: "Argentina", flag: "https://flagsapi.com/AR/shiny/64.png" },
  { id: "8", name: "Armenia", flag: "https://flagsapi.com/AM/shiny/64.png" },
];

export default function CountryProfiles({navigation}) {
  const [searchText, setSearchText] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [selectedLetter, setSelectedLetter] = useState(null);
  // Function to handle letter press
  const onLetterPress = (letter) => {
    setSelectedLetter(letter);
    // You may add logic here to scroll FlatList or filter items
    console.log("Selected letter:", letter);
  };
  
  const searchFilter = (text) => {
    setSearchText(text);
    if (text) {
      const newData = countries.filter((item) => {
        const itemData = item.name.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredCountries(newData);
    } else {
      setFilteredCountries(countries);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}
      onPress={() => {
        if(item.name === "Afghanistan") {
          navigation.navigate('Afghanistan');
        } else {
          // You can extend navigation for other countries
          alert(`No screen for ${item.name} yet.`);
        }
      }}
    >
      <Image source={{ uri: item.flag }} style={styles.flag} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.arrow}>&gt;</Text>
    </TouchableOpacity>
  );

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      {/*<View style={styles.navBar}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backArrow}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Country Profiles</Text>
        <View style={{ width: 40 }} />
      </View>*/}

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search a country"
        value={searchText}
        onChangeText={(text) => searchFilter(text)}
        placeholderTextColor="#999"
      />

      {/* List of Countries */}
      <FlatList
        data={filteredCountries}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        //contentContainerStyle={{ paddingBottom: 40 }}
      />

      {/* Alphabet Bar */}
      <View style={styles.alphabetBar}>
    {alphabet.map((letter) => (
      <TouchableOpacity
        key={letter}
        style={styles.letterBtn}
        onPress={() => onLetterPress(letter)}
        activeOpacity={0.6}
      >
        <Text
          style={[
            styles.letter,
            letter === selectedLetter && styles.letterSelected,
          ]}
        >
          {letter}
        </Text>
      </TouchableOpacity>
    ))}
  </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  navBar: {
    height: 56,
    backgroundColor: "#012a5b",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  backButton: {
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  backArrow: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  searchBar: {
    height: 40,
    margin: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 14,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 35,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  flag: {
    width: 32,
    height: 24,
    resizeMode: "contain",
    marginRight: 15,
  },
  name: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  arrow: {
    fontSize: 22,
    color: "#666",
  },
  alphabetBar: {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: 40,
  borderTopWidth: 1,
  borderTopColor: "#ddd",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: "#fff",
  paddingHorizontal: 10,       // added padding inside
  elevation: 3,                // Android shadow
  shadowColor: "#000",         // iOS shadow
  shadowOffset: { width: 0, height: -2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  // marginBottom removed, as absolute position bottom is enough
},

  letterBtn: {
    paddingHorizontal: 5,
  },
  letter: {
    fontSize: 16,
    color: "#007AFF",
  },
  letterSelected: {
  color: "#FF4500", // For example, orange/red highlight
  fontWeight: "bold",
},

});
