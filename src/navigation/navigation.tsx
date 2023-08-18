import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../views/home/home';
import ProductDetail from '../views/productDetail/productDetail';

const Stack = createStackNavigator();

const Navigation = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{
        headerShown: false
      }} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ headerTitle: "" }} />
    </Stack.Navigator>
  );
};

export default Navigation;
