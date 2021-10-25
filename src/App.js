/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import * as React from 'react';
 import { Button, View, Text } from 'react-native';
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';

 function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}
  
  const Stack = createNativeStackNavigator();
  
  function DetailsScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details</Text>
        <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
        />
        <Button
          title="Go to Homescreen"
          onPress={() => navigation.navigate('Home')}
        />
        <Button title="Go back" onPress={() => navigation.goBack()}/>
        <Button title="Go back to first screen in stack" onPress={() => navigation.popToTop()}/>
      </View>
    );
  }

  function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{title:'overview'}}/>
          <Stack.Screen name="Details" component={DetailsScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  export default App;
