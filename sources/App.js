import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './components/home/home';
import ProfileScreen from './components/profile/profile'
import MessageScreen from './components/messages/messages';
import { ProvideAuth } from "./use-auth.js";


const Tab = createMaterialBottomTabNavigator();

function App() {
  return (
    <ProvideAuth>
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Home"
            activeColor="#000000"
            barStyle={{ backgroundColor: 'darkorange'}}
          >
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="home" color={color} size={22} />
                ),
              }}
            />
            <Tab.Screen
              name="Messages"
              component={MessageScreen}
              options={{
                tabBarLabel: 'Messages',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="message-processing-outline" color={color} size={22} />
                ),
              }}
            />
            <Tab.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="account" color={color} size={22} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ProvideAuth>
  );
}

export default App;