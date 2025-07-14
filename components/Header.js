import { StyleSheet,View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
   
    const cartData = useSelector((state)=>state.reducer || []);
      return (
        <View style={styles.container}>
            <Text style={{
                fontSize: 20,
                textAlign: 'right',
                padding: 20,
                backgroundColor: 'orange',
                color: 'blue'
            }}>
                {Array.isArray(cartData) ? cartData.length : 0}
            </Text>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
  container:{
    marginTop:18,
    
  },
})