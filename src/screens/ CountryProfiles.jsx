import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const countries = [
  { id: '1', name: 'Afghanistan', flag: 'https://flagsapi.com/AF/shiny/64.png' },
  { id: '2', name: 'Albania', flag: 'https://flagsapi.com/AL/shiny/64.png' },
  { id: '3', name: 'Algeria', flag: 'https://flagsapi.com/DZ/shiny/64.png' },
  { id: '4', name: 'Andorra', flag: 'https://flagsapi.com/AD/shiny/64.png' },
  { id: '5', name: 'Angola', flag: 'https://flagsapi.com/AO/shiny/64.png' },
  { id: '6', name: 'Antigua and Barbuda', flag: 'https://flagsapi.com/AG/shiny/64.png' },
  { id: '7', name: 'Argentina', flag: 'https://flagsapi.com/AR/shiny/64.png' },
  { id: '8', name: 'Armenia', flag: 'https://flagsapi.com/AM/shiny/64.png' },
];

export default function CountryProfiles({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [selectedLetter, setSelectedLetter] = useState(null);

  const onLetterPress = letter => {
    setSelectedLetter(letter);
    // Optionally filter countries starting with selected letter
    const newFiltered = countries.filter(country =>
      country.name.toUpperCase().startsWith(letter)
    );
    setFilteredCountries(newFiltered);
  };

  const searchFilter = text => {
    setSearchText(text);
    if (text) {
      const newData = countries.filter(item => {
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
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        if (item.name === 'Afghanistan') {
          navigation.navigate('Afghanistan');
        } else {
          alert(`No screen for ${item.name} yet.`);
        }
      }}
    >
      <Image source={{ uri: item.flag }} style={styles.flag} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.arrow}>&gt;</Text>
    </TouchableOpacity>
  );

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search a country"
        value={searchText}
        onChangeText={text => searchFilter(text)}
        placeholderTextColor="#999"
      />

      {/* List of Countries */}
      <FlatList
        data={filteredCountries}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: height * 0.07 }} // space for alphabet bar
      />

      {/* Alphabet Bar */}
      <View style={styles.alphabetBar}>
        {alphabet.map(letter => (
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
    backgroundColor: '#fff',
  },
  searchBar: {
    height: height * 0.05, // ~5% of screen height, adaptive height
    margin: width * 0.03,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: width * 0.04,
    fontSize: width * 0.04,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.025, // proportional vertical padding
    paddingHorizontal: width * 0.04,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  flag: {
    width: width * 0.08, // adaptive width
    height: width * 0.06, // adaptive height
    resizeMode: 'contain',
    marginRight: width * 0.035,
  },
  name: {
    flex: 1,
    fontSize: width * 0.045,
    color: '#333',
  },
  arrow: {
    fontSize: width * 0.07,
    color: '#666',
  },
  alphabetBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.06,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: width * 0.025,
    elevation: Platform.OS === 'android' ? 3 : 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: Platform.OS === 'ios' ? 0.1 : 0,
    shadowRadius: 4,
  },
  letterBtn: {
    paddingHorizontal: width * 0.01,
  },
  letter: {
    fontSize: width * 0.04,
    color: '#007AFF',
  },
  letterSelected: {
    color: '#FF4500',
    fontWeight: 'bold',
  },
});
