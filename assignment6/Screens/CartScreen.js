import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet,Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function  CartScreen() {

    const [cart, setCart] = useState([]);

  useEffect(() => {

    const loadCart = async () => {

      const cartData = await AsyncStorage.getItem('cart');
      if (cartData) {

        setCart(JSON.parse(cartData));
      }
    };
    loadCart();
  }, []);

  const removeFromCart = async (productId) => {

    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);

    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {

    return cart.reduce((total, item) => total + item.price, 0);

  };

  return (
    <View style={styles.container}>


  <Image style={styles.Logo} source={require('../assets/Logo.png')}/>
  <Image style={styles.search} source={require('../assets/Search.png')}/>

  <Text style={styles.check}>CHECKOUT</Text>

      <FlatList

        data={cart}
        keyExtractor={(item) => item.id}

        renderItem={({ item }) => (
          <View style={styles.product}>
            <Image source={item.image} style={styles.image} />

            <Text>{item.name}</Text>



            <Text style={styles.price}>${item.price}</Text>

            <TouchableOpacity style={styles.button} onPress={() => removeFromCart(item.id)}>
            <Image source={require('../assets/remove.png')}/>
            </TouchableOpacity>
          </View>
        )}
      />
      <Text style={styles.total}> EST. Total                        : ${calculateTotal()}</Text>

    </View>
  );

};

const styles = StyleSheet.create({

  Logo:{
    left:130,
    bottom:10
  },
  search:{
    left:270,
    bottom:40,
  },

  check:{
    textAlign:'center',
    fontSize:24,
  },

    container: {
      flex: 1,
      padding: 16,
    },

    product: {
      padding: 16,
     
    },

    

   

    image: {
      width: 120,
      height: 160,
      marginBottom: 8,
    },

    button: {
      padding: 10,
      borderRadius: 5,
    },

    buttonText: {
      color: '#fff',
      textAlign: 'center',
    },

    total: {
      fontSize: 24,
      fontWeight: 'bold',
      padding: 16,
      textAlign: 'center',
      color:'#FF7F7F'
    },
  });

