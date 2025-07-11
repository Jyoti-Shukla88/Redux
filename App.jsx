import { StyleSheet,View, Text, Image,SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import Header from './components/Header';
import Product from './components/Product';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import  store,{  persistor } from './components/redux/store';

const products =[
  {
    name: 'Samsung Mobile',
    color:'white',
    price: 'Rs 30000',
    image:'https://i.pinimg.com/originals/70/84/f4/7084f4182630ae4bd2bcc9cbaa831d6e.png'
  },
  {
    name: 'Apple I phone',
    color:'black',
    price: 'Rs 130000',
    image:'https://i.pinimg.com/originals/70/84/f4/7084f4182630ae4bd2bcc9cbaa831d6e.png'
  },
  {
    name: 'Nokia Mobile',
    color:'green',
    price: 'Rs 20000',
    image:'https://i.pinimg.com/originals/70/84/f4/7084f4182630ae4bd2bcc9cbaa831d6e.png'
  },
  {
    name: 'MI Mobile',
    color:'grey',
    price: 'Rs 10000',
    image:'https://i.pinimg.com/originals/70/84/f4/7084f4182630ae4bd2bcc9cbaa831d6e.png'
  },
  {
    name: 'Oppo Mobile',
    color:'blue',
    price: 'Rs 15000',
    image:'https://i.pinimg.com/originals/70/84/f4/7084f4182630ae4bd2bcc9cbaa831d6e.png'
  },
]
const App = () => {
  return ( 
    
    <View style={styles.container} >
      <Header/>
      <ScrollView>
      
      {products.map((item)=>(<Product key={item.name} item={item}/>)
      )}
   
      </ScrollView>
      
    </View>
    
    

  )
}
const MyApp = () => (
  <Provider store = {store}>
     <PersistGate loading ={null} persistor ={persistor}>
      <App/>
     </PersistGate>
  </Provider>
);

export default MyApp;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    
  },
})