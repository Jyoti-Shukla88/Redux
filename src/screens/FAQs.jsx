import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const filterOptions = [
  { label: 'Title', value: 'title' },
  { label: 'Duration', value: 'duration' },
  { label: 'Level', value: 'level' },
  { label: 'Instructor', value: 'instructor' },
];

const SearchWithDropdown = () => {
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0].value);
  const [searchText, setSearchText] = useState('');

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        data={filterOptions}
        labelField="label"
        valueField="value"
        placeholder="Select filter"
        value={selectedFilter}
        onChange={item => setSelectedFilter(item.value)}
      />
      <TextInput
        style={styles.input}
        placeholder={`Search by ${filterOptions.find(opt => opt.value === selectedFilter).label}`}
        value={searchText}
        onChangeText={setSearchText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: '100%',
  },
  dropdown: {
    marginBottom: 12,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
});

export default SearchWithDropdown;