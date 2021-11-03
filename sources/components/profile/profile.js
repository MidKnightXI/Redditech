import { View, Text, ScrollView, Button } from 'react-native'
import * as React from 'react'
import { Icon } from 'react-native-elements'

import { useAuth } from '../../use-auth';

export default function ProfileScreen() {
  const clientStatus = useAuth();
  const [renderParam, setRenderParam] = React.useState(false);
  if (clientStatus.isSignIn === true && renderParam === false) {
    return (
      <View>
        <View style={{flexDirection: "row", padding: 10, height: 85, margin: 10}}>
          <Icon
            size={36}
            name='gear'
            type='evilicon'
            onPress={()=>setRenderParam(true)}
          />
          <Text> this is setting button</Text>       
        </View>
      </View>
    );
  } else if (clientStatus.isSignIn === true && renderParam === true) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Icon
          size={36}
          name='arrow-left'
          type='evilicon'
          onPress={()=>setRenderParam(false)}
        />
        <ScrollView>
          <Text>
            this is some text
          </Text>
        </ScrollView>
      </View>
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
    );
  }
}