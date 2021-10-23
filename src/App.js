/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {
    Component,
    View,        
    Text,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import callRedApi from './api_calls/login_call';
import type {Node} from 'react';

const TokenContext = React.createContext(callRedApi());

const App: () => Node = () => {
  return (
      <View>
          <Text>
              this is a text
          </Text>
      </View>
  );
};

export default App;
