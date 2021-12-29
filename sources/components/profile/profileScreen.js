import { View, Text, ScrollView, Button, StyleSheet } from 'react-native'
import * as React from 'react'
import { Icon } from 'react-native-elements'

import { useAuth } from '../../use-auth';
import Settings from './settings/settings';
import Profile from './profile';

export default function ProfileScreen() {
  const clientStatus = useAuth();
  const [renderParam, setRenderParam] = React.useState(false);
  if (clientStatus.isSignIn === true && renderParam === false) {
    return (
      <View style={style.container}>
        <View style={style.navbar}>
          <Icon
            size={36}
            name='gear'
            type='evilicon'
            onPress={()=>setRenderParam(true)}
          />
        </View>
        <Profile/>
      </View>
    );
  } else if (clientStatus.isSignIn === true && renderParam === true) {
    return (
      <View style={style.container}>
        <View style={style.navbar}>
          <Icon
            size={36}
            name='arrow-left'
            type='evilicon'
            onPress={()=>setRenderParam(false)}
          />
        </View>
        {/* <Settings style={style.setting}/> */}
      </View>
    )
  } else {
    return (
      <View style={style.connect}>
        <Button
          onPress={clientStatus.signin}
          title='Login with Reddit'
          accessibilityLabel='To access to your profile click on this button'
          color='#ff4500'/>
      </View>
    );
  }
}

const style = StyleSheet.create({
  connect: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  navbar: {
    flex: 1,
    flexDirection: 'row',
    padding: 10
  },
  setting: {
    flex: 9,
  }
})