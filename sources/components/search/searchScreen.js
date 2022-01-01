import * as React from 'react';
import { Button, View, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../../use-auth';
import Search from './search';
import Subreddit from './subreddit';


const Stack = createNativeStackNavigator();

export default function SearchScreen() {
  const clientStatus = useAuth();
  if (clientStatus.isSignIn === true) {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName='Search'>
          <Stack.Screen name='Search' component={Search} />
          <Stack.Screen name='Subreddit' component={Subreddit} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  } else {
    return (
      <View style={style.button}>
        <Button
          onPress={clientStatus.signin}
          title='Login with Reddit'
          accessibilityLabel='To search a subreddit click on this button'
          color='#ff4500'/>
      </View>
    )
  }
}

const style = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})