
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import  AsyncStorage from '@react-native-async-storage/async-storage';


const products = [
    { id: '1', name: 'Office Wear', price: 120, image:require('../assets/dress1.png') },

    { id: '2', name: 'Black', price: 120, image:require('../assets/dress2.png') },

    { id: '3', name: 'Church Wear', price: 120, image:require('../assets/dress3.png') },

    { id: '4', name: 'Lamerei', price: 120, image:require('../assets/dress4.png') },

    { id: '5', name: '21WN', price: 120, image:require('../assets/dress5.png') },

    { id: '6', name: 'Lopo', price: 120 , image:require('../assets/dress6.png')},

    { id: '7', name: 'Iame', price: 120, image:require('../assets/dress7.png') },
];

export default function  HomeScreen({navigation}) {

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
    
      const addToCart = async (product) => {
        const updatedCart = [...cart, product];

        setCart(updatedCart);

        await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      };


return(
   

<View style={styles.container}>

<Image style={styles.menu} source={require('../assets/Menu.png')}/>
<Image style={styles.Logo} source={require('../assets/Logo.png')}/>
<Image style={styles.search} source={require('../assets/Search.png')}/>
<Image style={styles.Bag} source ={require('../assets/shoppingBag.png')}/>

<Text style={styles.story} >
    OUR STORY
</Text>

<Image style={styles.List} source={require('../assets/Listview.png')}/>

<Image style={styles.filter} source={require('../assets/Filter.png')}/>

<FlatList
  data={products}
  keyExtractor={(item) => item.id}

  renderItem={({ item }) => (
    <View style={styles.product}>

      <Image source={item.image} style={styles.image} />

      <Text>{item.name}</Text>
      <Text>${item.price}</Text>

      <TouchableOpacity style={styles.button} onPress={() => addToCart(item)}>
       <Image style={styles.add} source={require('../assets/add_circle.png')}/>
      </TouchableOpacity>
    </View>
  )}
/>

<TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>

  <Text style={styles.buttonText}>Go to Cart</Text>

</TouchableOpacity>
</View>
   
       
   
);

};

const styles = StyleSheet.create({

    menu:{

    },

    Logo:{
      left:130,
      bottom:30
    },
    search:{
      left:260,
      bottom:55,
    },

    Bag:{
      left:310,
      bottom:85,
    },

    story:{
      fontSize:24,
      bottom:10
    },
    List:{
      left:260,
      bottom:35,
    },

    filter:{
      left:300,
      bottom:55,
      width:20,
      height:20
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

      buttonText: {
        color: '#fff',
        textAlign: 'center',
      },
      cartButton: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
      },

      

  });
  