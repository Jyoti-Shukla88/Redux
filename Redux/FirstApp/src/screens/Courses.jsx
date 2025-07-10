import { StyleSheet, Text, View , FlatList,SafeAreaView,TextInput} from 'react-native'
import React from 'react'
import Course from './flatlist1.json';
import {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';

const levelColors = {
  Beginner: '#d4edda',      // Light Green
  Intermediate: '#d1ecf1',  // Light Blue
  Advanced: '#ffe5b4',      // Light Orange
};

const FILTER_OPTIONS = [
  { label: 'Title', value: 'title' },
  { label: 'Duration', value: 'duration' },
  { label: 'Level', value: 'level' },
  { label: 'Instructor', value: 'instructor' },
];


function CourseItem ({item}){
  return(
    
    <View style={[styles.card , {backgroundColor: levelColors[item.level]}]}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>Duration: {item.duration}</Text>
      <Text>Level: {item.level}</Text>
      <Text>Instructor: {item.instructor.name} ({item.instructor.experience} years) </Text>
      <View style={styles.topicsRow}>
        {item.topics.map((topic,idx) =>(
          <Text key={idx} style={styles.topicBadge}>{topic}</Text>
        ))}
      </View>
      {item.enrolled>200 && <Text style={styles.popular}> 🔥 Popular</Text>}
    </View>
    
  );
}

export default function CourseListScreen(){
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('title');
  const filteredCourses = Course.filter(item => {
    const searchText = search.toLowerCase();
    switch (selectedFilter) {
      case 'title':
        return item.title.toLowerCase().includes(searchText);
      case 'duration':
        return item.duration.toLowerCase().includes(searchText);
      case 'level':
        return item.level.toLowerCase().includes(searchText);
      case 'instructor':
        return item.instructor.name.toLowerCase().includes(searchText);
      default:
        return true;
    }
  });

  return(
    <SafeAreaView style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        data={FILTER_OPTIONS}
        labelField="label"
        valueField="value"
        value={selectedFilter}
        onChange={item => setSelectedFilter(item.value)}
        placeholder="Select Filter"
        selectedTextStyle={{ color: '#333', fontSize: 16 }}
      />
      <TextInput  style={styles.input} 
      placeholder = {`Search by ${FILTER_OPTIONS.find(opt => opt.value === selectedFilter)?.label || ''}...`}
      value={search}
      onChangeText={setSearch}/>
      <FlatList
        data={filteredCourses}
        keyExtractor={item => item.id}
        renderItem = {({item}) => <CourseItem item={item}/>}
        ListEmptyComponent={<Text style={styles.empty}>No courses found.</Text>}
      />
    
    </SafeAreaView>
    
  );
}
const styles = StyleSheet.create({
 container:{
  flex: 1,
  padding: 16,
  backgroundColor:'#fff',
 },
 card:{
  marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    // Simple border for visibility
    borderWidth: 1,
    borderColor: '#ccc',
 },
 title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  topicsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  topicBadge: {
    backgroundColor: '#eee',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 4,
    marginTop: 4,
    fontSize: 12,
  },
  popular: {
    marginTop: 8,
    color: 'red',
    fontWeight: 'bold',
  },
  input:{
    height:40,
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal:12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor:'#f7f7f7',
  },
  empty:{
    textAlign: 'center',
    marginTop: 20,
  },
  dropdown: {
    marginBottom: 12,
    height: 48,
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
})