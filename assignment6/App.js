
import HomeScreen from './Screens/HomeScreen';
import CartScreen from './Screens/CartScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
   <NavigationContainer>

    <Stack.Navigator>

      <Stack.Screen name='Home' component={HomeScreen}/>
      <Stack.Screen name='Cart' component={CartScreen}/>

    </Stack.Navigator>
   </NavigationContainer>
  );
};



