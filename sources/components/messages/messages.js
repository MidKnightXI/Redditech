import { Button, View, Text, ScrollView } from 'react-native';
import * as React from 'react';

import { useAuth } from '../../use-auth';



export default function MessageScreen() {
  const clientStatus = useAuth();
  if (clientStatus.isSignIn === true) {
    return (
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Messages Screen</Text>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          onPress={clientStatus.signin}
          title='Login with Reddit'
          accessibilityLabel='To access to your messages click on this button'
          color='#ff4500'/>
      </View>
    )
  }
}