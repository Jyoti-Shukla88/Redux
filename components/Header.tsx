import { StyleSheet,View, Text } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

interface ProductItem {
  name: string;
  price: number;
  color: string;
  image: string;
}

interface RootState {
  reducer: ProductItem[];
}

const Header: React.FC = () => {
   
    const cartData = useSelector((state: RootState)=>state.reducer || []);
      return (
        <View style={styles.container}>
            <Text style={styles.cartText}>
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
  cartText: {
    fontSize: 20,
    textAlign: 'right',
    padding: 20,
    backgroundColor: 'orange',
    color: 'blue'

  }
})