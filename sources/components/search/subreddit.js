import * as React from 'react';
import { Button, View, Text, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../../use-auth';

export default function Subreddit({route, navigation}) {
  const tmp = route.params.data
  return (
    <View>
      <Text>test</Text>
    </View>
  )
}