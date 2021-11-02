import { View, Text, ScrollView } from 'react-native';
import * as React from 'react';

import { useAuth } from '../../use-auth';

export default function HomeScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
  }