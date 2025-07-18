import { StyleSheet, View, Text, Image, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { addToCart, removeFromCart } from './redux/action';
import { useDispatch, useSelector } from 'react-redux';

interface ProductItem {
    name: String;
    price: number;
    color: string;
    image: string;
}

interface ProductProps {
  item: ProductItem;
}

interface RootState {
  reducer: ProductItem[];
}

const Product: React.FC<ProductProps> = ({ item }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.reducer|| []);
    const [isAdded, setIsAdded] = useState(false)
    const handleAddToCart = () => {
        console.log('Adding:', item);
        dispatch(addToCart(item));
    }

    const handleRemoveFromCart = () => {
        console.log('Removing:',item.name);
        dispatch(removeFromCart(item.name));
    }
   useEffect(() => {
        let result = Array.isArray(cartItems)
            ? cartItems.filter((element) => element.name === item.name)
            : [];
        setIsAdded(result.length > 0);
    }, [cartItems, item.name]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}> {item.name}</Text>
            <Text style={styles.text}> {item.price}</Text>
            <Text style={styles.text}> {item.color}</Text>
            <Image source={{ uri: item.image }} style={styles.image} />
            {
                isAdded ?
                    (<Button title='Remove to cart' onPress={handleRemoveFromCart} />) :
                    (<Button title='Add to cart' onPress={handleAddToCart} />)
            }
        </View>
    );
}

export default Product;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center', 
        borderBottomColor: 'orange', 
        borderBottomWidth: 2, 
        padding: 40
    },
    text: {
        fontSize: 24,

    },
    image: {
        width: 50, 
        height: 100

    },
})