import { StyleSheet,SafeAreaView,Text, View,TouchableOpacity, Image,ScrollView,} from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import RefferalCode from './src/screens/RefferalCode';
import FAQs from './src/screens/FAQs';
import OurHandbook from './src/screens/OurHandbook';
//import Community from './src/screens/Community';
import Help from './src/screens/Help';
import Settings from './src/screens/Settings';
import PersonalData from './src/screens/PersonalData';
import Courses from './src/screens/Courses';
import CountryProfiles from './src/screens/ CountryProfiles';
import Afghanistan from './src/screens/Afghanistan';
import 'react-native-gesture-handler';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Personal Data" component={PersonalData} />
        <Stack.Screen name="Settings" component={Settings}/>
        <Stack.Screen name="Courses" component={Courses}/>
        <Stack.Screen name="Refferal Code" component={RefferalCode} />
        <Stack.Screen name="FAQs" component={FAQs} />
        <Stack.Screen name="Our Handbook" component={OurHandbook} />
        <Stack.Screen name="Country Profiles" component={CountryProfiles} />
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen name="Afghanistan" component={Afghanistan} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


function ProfileScreen({ navigation }){
  return (
    <ScrollView style={styles.Container}>
      <View style = {styles.profileHeader}>
          <Image source ={{uri:'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?cs=srgb&dl=pexels-justin-shaifer-501272-1222271.jpg&fm=jpg'}}
             style= {styles.avatar}/>
      
        <View>
          <Text style = {styles.name}>William Jhon Malik</Text>
          <Text style = {styles.subtitle}>Aggressive Investor</Text>
        </View>
      </View>

  {/* Menu */}
     <View style = {styles.menuSection}>
      <TouchableOpacity style={styles.menuItem} onPress = {()=> navigation.navigate("Personal Data")}>
        <MenuItem emoji="👤" label="Personal Data" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress = {()=> navigation.navigate("Settings")}>
        <MenuItem emoji="⚙️" label="Settings" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress = {()=> navigation.navigate("Courses")}>
        <MenuItem emoji="📄" label="Course List" />
      </TouchableOpacity>
       <TouchableOpacity style={styles.menuItem} onPress = {()=> navigation.navigate("Refferal Code")}>
        <MenuItem emoji="💙" label="Refferal Code" />
     </TouchableOpacity>   
      </View>
      <View style = {styles.menuSection}>
       <TouchableOpacity style={styles.menuItem} onPress = {()=> navigation.navigate("FAQs")}>
        <MenuItem emoji="💬" label="FAQs" />
      </TouchableOpacity> 
       <TouchableOpacity style={styles.menuItem} onPress = {()=> navigation.navigate("Our Handbook")}>
        <MenuItem emoji="📘" label="Our Handbook" />
      </TouchableOpacity> 
       <TouchableOpacity style={styles.menuItem} onPress = {()=> navigation.navigate("Country Profiles")}>
        <MenuItem emoji="👥" label="Country Profiles" />
      </TouchableOpacity> 
        
      </View>
      {/* Help Section */}
      <View style={styles.helpSection}>
        <TouchableOpacity style={styles.menuItem} onPress = {()=> navigation.navigate("Help")}>
         <Text style={styles.helpEmoji}>🎧</Text>
        <Text style={styles.helpText}>Feel Free to Ask, We Ready to Help</Text>  
        </TouchableOpacity>
       
      </View>
    </ScrollView>
  
    
  );
}

function MenuItem({ emoji, label }) {
  return (
    <SafeAreaView style={styles.menuItem} >
      <View style={styles.emojiBox}>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>
      <Text style={styles.menuLabel}>{label}</Text>
      <Text style={styles.arrow}>{'>'}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 2,
    padding:20,
    backgroundColor: '#fff'
  },
  profileHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10,
    marginTop: 10,
  },
    avatar: { 
      width: 70, 
      height: 70,
      borderRadius: 16, 
      marginRight: 16, 
      backgroundColor: '#eee'
    },
    name: { 
      fontSize: 20, 
      fontWeight: 'bold', 
      color: '#0a2342' 
    },
    subtitle: { 
      fontSize: 15, 
      color: '#7a7a7a' 
    },
    menuSection: { 
      marginVertical: 10,
    },
    menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    },
    emojiBox: {
    width: 40,
    height: 40,
    backgroundColor: '#f4f7fd',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    },
  emoji: { 
    fontSize: 22 
  },
  menuLabel: { 
    fontSize: 16, 
    color: '#0a2342', 
    flex: 1 
  },
  arrow: { 
    fontSize: 20, 
    color: '#b0b0b0' 
  },
  helpSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef2ff',
    borderRadius: 14,
    padding: 5,
    marginTop: 10,
    marginBottom:30,
  },
  helpEmoji: { 
    fontSize: 28, 
    color: '#3b5bdb' 
  },
  helpText: { 
    marginLeft: 12, 
    color: '#3b5bdb', 
    fontSize: 16, 
    fontWeight: '500' 
  },
});