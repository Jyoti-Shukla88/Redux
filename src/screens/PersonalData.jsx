import { StyleSheet, SafeAreaView, Text, TextInput, View , Button} from 'react-native'
import React from 'react'

const PersonalData = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.text}>Name:</Text>
      <TextInput style ={styles.textInput } placeholder="Enter your name"/>
      <Button style={styles.button} title="Add"/>
    </View>
    </SafeAreaView>
    
  )
}

export default PersonalData

const styles = StyleSheet.create({
  container: {
    paddingTop:50,
    paddingHorizontal:16,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text:{
    fontSize: 15,
    
  },
  textInput:{
    borderWidth:1,
    borderColor: '#ccccccc',
    width: '65%',
    marginRight: 8,
    padding: 8,
  },
  button:{
    width: '20%',
  }
})