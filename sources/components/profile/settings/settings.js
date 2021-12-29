import * as React from 'react'
import { View, Text, Switch, StyleSheet, FlatList } from 'react-native'
import { Icon } from 'react-native-elements'

import { useAuth } from '../../../use-auth';

export default function Settings() {
  const clientStatus = useAuth();
  clientStatus.request('https://oauth.reddit.com/api/v1/me', 'GET').then(data => {
  console.log(data)})
  return (
    <View style={style.container}>
      <FlatList>
        <View></View>
      </FlatList>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
