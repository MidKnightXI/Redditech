import * as React from 'react';
import { Button, View, Text, StyleSheet} from 'react-native';

import { useAuth } from '../../use-auth';
import Search from './search';

export default function SearchScreen() {
  const clientStatus = useAuth();
  if (clientStatus.isSignIn === true) {
    return (
      <View>
        <Search/>
      </View>
    )
  } else {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          onPress={clientStatus.signin}
          title='Login with Reddit'
          accessibilityLabel='To search a subreddit click on this button'
          color='#ff4500'/>
      </View>
    )
  }
}