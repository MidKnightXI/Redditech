import { Button, View, Text, ScrollView } from 'react-native';
import * as React from 'react';

import { useAuth } from '../../use-auth';
import Settings from '../profile/settings/settings';

export default function SearchScreen() {
  const clientStatus = useAuth();
  if (clientStatus.isSignIn === true) {
    return (
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Search Screen</Text>
        </View>
      </ScrollView>
    );
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