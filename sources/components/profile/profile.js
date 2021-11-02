import { View, Text, ScrollView, Button } from 'react-native'
import * as React from 'react'

import { useAuth } from '../../use-auth';

export default function ProfileScreen() {
    const clientStatus = useAuth();
    if (clientStatus.isSignIn === true) {
      return (
        <ScrollView>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Profile Screen</Text>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button
            onPress={clientStatus.signin}
            title='Login with Reddit'
            accessibilityLabel='To access to your profile click on this button'
            color='#ff4500'/>
        </View>
      )
    }
  }